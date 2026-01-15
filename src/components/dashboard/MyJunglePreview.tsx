import Card from "@/components/ui/Card";
import { FaEllipsisH } from "react-icons/fa";
import { WiDaySunny, WiHumidity } from "react-icons/wi";

export default function MyJunglePreview() {
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-brand-dark">My Jungle</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-brand-light rounded-lg transition-colors">
            {/* Grid Icon */}
            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          </button>
          <button className="p-2 hover:bg-brand-light rounded-lg transition-colors">
            {/* List Icon */}
            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plant Card 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden group">
            {/* Image Placeholder - emulate the Monstera */}
            <div className="absolute inset-0 bg-green-100/50 flex items-center justify-center text-brand-primary/30 font-bold text-4xl">
              Monstera
            </div>
            <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-primary">
              Healthy
            </span>
          </div>

          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-brand-dark">
                Monstera Deliciosa
              </h3>
              <p className="text-xs text-brand-primary italic">
                Swiss Cheese Plant
              </p>
            </div>
            <button className="text-gray-400 hover:text-brand-primary">
              <FaEllipsisH />
            </button>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-1">
              <WiDaySunny className="text-amber-400" size={20} />
              <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-3/4"></div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <WiHumidity className="text-blue-400" size={20} />
              <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-1/2"></div>
              </div>
            </div>
          </div>

          <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-semibold text-text-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
            View Details
          </button>
        </div>

        {/* Plant Card 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden group">
            <div className="absolute inset-0 bg-green-200/30 flex items-center justify-center text-brand-primary/30 font-bold text-4xl">
              Ficus
            </div>
            <span className="absolute top-2 right-2 bg-rose-100 text-rose-500 px-2 py-1 rounded text-xs font-bold">
              Needs Water
            </span>
          </div>

          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-brand-dark">
                Fiddle Leaf Fig
              </h3>
              <p className="text-xs text-brand-primary italic">Ficus Lyrata</p>
            </div>
            <button className="text-gray-400 hover:text-brand-primary">
              <FaEllipsisH />
            </button>
          </div>

          <div className="flex items-center gap-4 my-4">
            {/* Stats... simplified */}
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <WiDaySunny className="text-amber-400" /> High Light
            </div>
          </div>

          <button className="w-full py-2 bg-brand-dark text-white rounded-lg text-sm font-semibold hover:bg-brand-primary transition-colors">
            Water Now
          </button>
        </div>
      </div>
    </Card>
  );
}
