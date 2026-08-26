import Benefits from './components/Benefits';
import Capabilities from './components/Capabilities';
import ChatWidget from './components/ChatWidget';
import Deliverables from './components/Deliverables';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import LeadSection from './components/LeadSection';
import Packages from './components/Packages';
import Problems from './components/Problems';
import Process from './components/Process';
import Solution from './components/Solution';
import UseCases from './components/UseCases';
import WhyGascolae from './components/WhyGascolae';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <Benefits />
        <Capabilities />
        <UseCases />
        <Process />
        <Packages />
        <Deliverables />
        <WhyGascolae />
        <Faq />
        <LeadSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
