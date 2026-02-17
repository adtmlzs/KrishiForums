import Hero from '../components/home/Hero';
import Problem from '../components/home/Problem';
import Solution from '../components/home/Solution';
import KrishiMitraCar from '../components/home/KrishiMitraCar';
import Benefits from '../components/home/Benefits';
import Impact from '../components/home/Impact';
import FuturePlans from '../components/home/FuturePlans';
import Roadmap from '../components/home/Roadmap';
import Team from '../components/home/Team';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Problem />
            <Solution />
            <KrishiMitraCar />
            <Benefits />
            <Impact />
            <FuturePlans />
            <Roadmap />
            <Team />
        </div>
    );
};

export default Home;
