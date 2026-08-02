import SkillsOrbit from './SkillsOrbit';

export default function Skills() {
  return (
    <section id="software" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-1/10 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-4">
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest mb-2">// TOOLBOX</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Software I Use</h2>
          <div className="mt-4 h-1 w-16 bg-blue-500 rounded-full" />
        </div>

        {/* Premium Interactive Skills Orbit Showcase */}
        <div className="relative">
          <SkillsOrbit />
        </div>
      </div>
    </section>
  );
}

