import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import PsicanaliseEnergetico from "./pages/PsicanaliseEnergetico";
import AtendimentosEnergeticos from "./pages/AtendimentosEnergeticos";
import HarmonizacaoJudicial from "./pages/HarmonizacaoJudicial";
import PontoDeConexao from "./pages/PontoDeConexao";
import ProTerapeuta from "./pages/ProTerapeuta";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Depoimentos from "./pages/Depoimentos";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/psicanalise-energetico" element={<PageTransition><PsicanaliseEnergetico /></PageTransition>} />
        <Route path="/atendimentos-energeticos" element={<PageTransition><AtendimentosEnergeticos /></PageTransition>} />
        <Route path="/harmonizacao-judicial" element={<PageTransition><HarmonizacaoJudicial /></PageTransition>} />
        <Route path="/ponto-de-conexao" element={<PageTransition><PontoDeConexao /></PageTransition>} />
        <Route path="/pro-terapeuta" element={<PageTransition><ProTerapeuta /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/depoimentos" element={<PageTransition><Depoimentos /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
