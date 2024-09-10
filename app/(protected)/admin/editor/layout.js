import { LugaresProvider } from "@/contexts/LugaresContext";

export default function EditorLayout({ children }) {
  return (
    <LugaresProvider>
      {children}
    </LugaresProvider>
  );
}