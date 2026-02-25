import PlantVisual from './PlantVisual';
import { ARCHETYPE_INFO } from '../types';
import type { PlantArchetype } from '../types';

const STAGES = [1, 2, 3, 4, 5, 6, 7];
const MODULE_NAMES = ['Seed', 'Roots', 'Stem', 'Leaves', 'Bloom', 'Fruit', 'Harvest'];

const PlantPreview = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] p-6">
      <h1 className="font-serif text-3xl text-center mb-2 text-[#2c2c2a]">Plant Preview — All 18 Archetypes</h1>
      <p className="text-center text-xs text-[#2c2c2a]/50 mb-8">Each row shows stages 1–7 (Seed → Harvest)</p>

      {(['visionary', 'builder', 'survivor'] as const).map(cat => (
        <div key={cat} className="mb-10">
          <h2 className="font-serif text-xl text-[#d4af37] mb-4 capitalize">
            {cat === 'visionary' ? 'Visionary — Sky (Flowers)' : cat === 'builder' ? 'Builder — Sea (Trees)' : 'Survivor — Land (Herbs)'}
          </h2>
          {ARCHETYPE_INFO.filter(a => a.category === cat).map(arch => (
            <div key={arch.type} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{arch.icon}</span>
                <span className="font-bold text-sm text-[#2c2c2a]">{arch.name}</span>
                <span className="text-xs text-[#2c2c2a]/40 capitalize">({arch.type})</span>
                <span className="text-xs text-[#2c2c2a]/30">— {arch.description}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {STAGES.map((stage, i) => (
                  <div key={stage} className="bg-white rounded-xl border border-[#2c2c2a]/10 p-1">
                    <div className="text-[9px] text-center font-bold text-[#2c2c2a]/40 mb-1">
                      {stage}. {MODULE_NAMES[i]}
                    </div>
                    <div className="w-full h-32">
                      <PlantVisual
                        type={arch.type as PlantArchetype}
                        stage={stage}
                        instanceId={`preview-${arch.type}-${stage}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlantPreview;
