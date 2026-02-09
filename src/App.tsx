import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import PsicanaliseEnergetico from "./pages/PsicanaliseEnergetico";
import AtendimentosEnergeticos from "./pages/AtendimentosEnergeticos";
import HarmonizacaoJudicial from "./pages/HarmonizacaoJudicial";
import PontoDeConexao from "./pages/PontoDeConexao";
import ProTerapeuta from "./pages/ProTerapeuta";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/psicanalise-energetico" element={<PsicanaliseEnergetico />} />
            <Route path="/atendimentos-energeticos" element={<AtendimentosEnergeticos />} />
            <Route path="/harmonizacao-judicial" element={<HarmonizacaoJudicial />} />
            <Route path="/ponto-de-conexao" element={<PontoDeConexao />} />
            <Route path="/pro-terapeuta" element={<ProTerapeuta />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
