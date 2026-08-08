export const REGISTRATION_URL = 'https://sahaj-registration.jitoaligarh.com';

interface RegisterButtonProps {
  className?: string;
  label?: string;
}

export default function RegisterButton({
  className = '',
  label = 'Register Now',
}: RegisterButtonProps) {
  return (
    <a
      href={REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-sans font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.14em] bg-orange hover:bg-orange-hover text-[#F7F3EC] border border-orange/25 shadow-[0_8px_20px_-10px_rgba(243,112,33,0.45)] transition-colors duration-300 select-none cursor-pointer ${className}`}
      data-cursor-label="register"
    >
      {label}
    </a>
  );
}
