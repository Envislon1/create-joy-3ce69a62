import { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface EditProfileModalProps {
  contestant: {
    id: string;
    full_name: string;
    photo_url: string | null;
  };
  onUpdate: () => void;
}

export function EditProfileModal({ contestant, onUpdate }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${contestant.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('contestant-photos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw new Error("Failed to upload photo");
      }

      const { data: urlData } = supabase.storage
        .from('contestant-photos')
        .getPublicUrl(fileName);
      
      const photoUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from("contestants")
        .update({ photo_url: photoUrl })
        .eq("id", contestant.id);

      if (updateError) {
        throw new Error("Failed to update photo");
      }

      toast({
        title: "Photo Updated",
        description: "Your photo has been updated successfully.",
      });
      
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        disabled={loading}
        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors border-2 border-section-blue disabled:opacity-50"
        aria-label="Edit photo"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-section-blue border-t-transparent rounded-full animate-spin" />
        ) : (
          <Pencil className="w-4 h-4 text-section-blue" />
        )}
      </button>
    </>
  );
}
