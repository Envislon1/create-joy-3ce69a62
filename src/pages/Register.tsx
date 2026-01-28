import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "@/components/RegistrationForm";

const Register = () => {
  const navigate = useNavigate();

  const handleRegistrationSuccess = (slug: string) => {
    navigate(`/contestant/${slug}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-section-blue overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Register Your Child
          </h1>
          <div className="w-24 h-1 bg-white/60 mx-auto rounded-full" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-section-blue">
        <div className="max-w-lg mx-auto">
          <p className="text-white/85 text-center mb-8">
            Fill in the details below to enter your child into the contest.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
