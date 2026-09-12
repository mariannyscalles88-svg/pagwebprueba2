import { useState, useEffect } from 'react';
import {
  INITIAL_PLANTS,
  INITIAL_TASKS,
  MICRO_ZONES,
  NUTRIENTS_INVENTORY,
  INITIAL_CARE_LOG,
  PlantSpecimen,
  CareTask,
  MicroZone,
  CareLogItem,
  NutrientProduct,
} from './data/botanicalData';
import { Sidebar, ScreenTab } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/views/OverviewView';
import { PlantInventoryView } from './components/views/PlantInventoryView';
import { WateringCalendarView } from './components/views/WateringCalendarView';
import { EnvironmentView } from './components/views/EnvironmentView';
import { FertilizationView } from './components/views/FertilizationView';
import { CareHistoryView } from './components/views/CareHistoryView';
import { SettingsView } from './components/views/SettingsView';
import { AddPlantModal } from './components/AddPlantModal';
import { LogCareModal } from './components/LogCareModal';
import { PlantDetailModal } from './components/PlantDetailModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('overview');
  const [plants, setPlants] = useState<PlantSpecimen[]>(() => {
    const saved = localStorage.getItem('verdant_plants');
    return saved ? JSON.parse(saved) : INITIAL_PLANTS;
  });
  const [tasks, setTasks] = useState<CareTask[]>(() => {
    const saved = localStorage.getItem('verdant_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  const [zones, setZones] = useState<MicroZone[]>(MICRO_ZONES);
  const [nutrients] = useState<NutrientProduct[]>(NUTRIENTS_INVENTORY);
  const [logs, setLogs] = useState<CareLogItem[]>(() => {
    const saved = localStorage.getItem('verdant_logs');
    return saved ? JSON.parse(saved) : INITIAL_CARE_LOG;
  });

  const [currentSeason, setCurrentSeason] = useState('Spring');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [isLogCareOpen, setIsLogCareOpen] = useState(false);
  const [selectedPlantDetail, setSelectedPlantDetail] = useState<PlantSpecimen | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sensor telemetry state
  const [conservatoryTemp, setConservatoryTemp] = useState(22.4);
  const [conservatoryHumidity, setConservatoryHumidity] = useState(64);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('verdant_plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('verdant_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('verdant_logs', JSON.stringify(logs));
  }, [logs]);

  // Complete a care routine task
  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    );

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // If plant exists, hydrate/feed it
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === task.plantId) {
          return {
            ...p,
            soilMoisture: Math.min(85, p.soilMoisture + 45),
            moistureStatus: 'Moist',
            lastWatered: 'Just now',
          };
        }
        return p;
      })
    );

    // Record into care history
    const newLog: CareLogItem = {
      id: `log-${Date.now()}`,
      plantName: task.plantName,
      action: task.type === 'water' ? 'Hydration' : task.type === 'fertilizer' ? 'Nutrient Feed' : 'Foliage Mist',
      amount: task.type === 'water' ? '350ml filtered water' : 'Diluted formula',
      zone: task.subLocation,
      timestamp: 'Just now',
      notes: `Task completed via dashboard quick action. ${task.description}`,
      operator: 'Elena Rostova',
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Water a specific plant directly
  const handleWaterPlant = (plantId: string) => {
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId) {
          return {
            ...p,
            soilMoisture: Math.min(85, p.soilMoisture + 40),
            moistureStatus: 'Moist',
            lastWatered: 'Just now',
          };
        }
        return p;
      })
    );

    // Mark any corresponding task as completed
    setTasks((prev) =>
      prev.map((t) => (t.plantId === plantId ? { ...t, completed: true } : t))
    );

    const plant = plants.find((p) => p.id === plantId);
    if (plant) {
      const newLog: CareLogItem = {
        id: `log-${Date.now()}`,
        plantName: plant.name,
        action: 'Hydration',
        amount: `${plant.volumeWaterMl}ml filtered rainwater`,
        zone: plant.room,
        timestamp: 'Just now',
        notes: `Manual watering recorded. Subterranean moisture refreshed.`,
        operator: 'Elena Rostova',
      };
      setLogs((prev) => [newLog, ...prev]);
    }
  };

  // Feed a plant
  const handleFeedPlant = (plantId: string) => {
    const plant = plants.find((p) => p.id === plantId);
    if (plant) {
      const newLog: CareLogItem = {
        id: `log-${Date.now()}`,
        plantName: plant.name,
        action: 'Nutrient Feed',
        amount: 'N-P-K 3-1-2 Spring Elixir (half strength)',
        zone: plant.room,
        timestamp: 'Just now',
        notes: `Spring surge nutrient application. Foliage leaf expansion supported.`,
        operator: 'Elena Rostova',
      };
      setLogs((prev) => [newLog, ...prev]);

      setTasks((prev) =>
        prev.map((t) =>
          t.plantId === plantId && t.type === 'fertilizer' ? { ...t, completed: true } : t
        )
      );
    }
  };

  // Add new plant
  const handleAddPlant = (newPlant: PlantSpecimen) => {
    setPlants((prev) => [newPlant, ...prev]);

    const newLog: CareLogItem = {
      id: `log-${Date.now()}`,
      plantName: newPlant.name,
      action: 'Hydration',
      amount: 'Initial potting soak',
      zone: newPlant.room,
      timestamp: 'Just now',
      notes: `Cataloged specimen into Station Alpha registry. Light: ${newPlant.fcRange}.`,
      operator: 'Elena Rostova',
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Log custom care
  const handleLogCare = (data: {
    plantId: string;
    plantName: string;
    action: 'Hydration' | 'Nutrient Feed' | 'Foliage Mist' | 'Repotting' | 'Pruning';
    amount: string;
    notes: string;
    room: string;
  }) => {
    const newLog: CareLogItem = {
      id: `log-${Date.now()}`,
      plantName: data.plantName,
      action: data.action,
      amount: data.amount,
      zone: data.room,
      timestamp: 'Just now',
      notes: data.notes,
      operator: 'Elena Rostova',
    };
    setLogs((prev) => [newLog, ...prev]);

    if (data.action === 'Hydration') {
      handleWaterPlant(data.plantId);
    }
  };

  // Run Sensor Sync
  const handleSyncSensors = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncSuccessMessage(null);

    setTimeout(() => {
      // Simulate minor sensor telemetry fluctuation
      setConservatoryTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setConservatoryHumidity((prev) =>
        Math.min(75, Math.max(50, prev + Math.floor(Math.random() * 3 - 1)))
      );

      setZones((prev) =>
        prev.map((z) => ({
          ...z,
          tempC: +(z.tempC + (Math.random() * 0.4 - 0.2)).toFixed(1),
          humidityRH: Math.min(80, Math.max(40, z.humidityRH + Math.floor(Math.random() * 3 - 1))),
          lightFC: Math.min(1500, Math.max(100, z.lightFC + Math.floor(Math.random() * 20 - 10))),
        }))
      );

      setIsSyncing(false);
      setSyncSuccessMessage('Sensors Synced (100%)');

      setTimeout(() => {
        setSyncSuccessMessage(null);
      }, 2500);
    }, 1100);
  };

  // Reset to initial seed data
  const handleResetData = () => {
    setPlants(INITIAL_PLANTS);
    setTasks(INITIAL_TASKS);
    setZones(MICRO_ZONES);
    setLogs(INITIAL_CARE_LOG);
    localStorage.removeItem('verdant_plants');
    localStorage.removeItem('verdant_tasks');
    localStorage.removeItem('verdant_logs');
  };

  // Number of active uncompleted tasks
  const urgentTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] font-body flex">
      {/* Pinned Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        urgentCount={urgentTasksCount}
        currentSeason={currentSeason}
        conservatoryTemp={conservatoryTemp}
        conservatoryHumidity={conservatoryHumidity}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Page Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen min-w-0">
        {/* Pinned Top Navigation Bar */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          urgentTasksCount={urgentTasksCount}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNavigateToCalendar={() => setCurrentTab('watering-calendar')}
        />

        {/* Content Viewport */}
        <main className="flex-1 w-full pt-20 px-4 sm:px-8 py-8">
          {currentTab === 'overview' && (
            <OverviewView
              plants={plants}
              tasks={tasks}
              onCompleteTask={handleCompleteTask}
              onOpenAddPlant={() => setIsAddPlantOpen(true)}
              onOpenLogCare={() => setIsLogCareOpen(true)}
              onSelectPlant={(plant) => setSelectedPlantDetail(plant)}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              searchQuery={searchQuery}
              onSyncSensors={handleSyncSensors}
              isSyncing={isSyncing}
              syncSuccessMessage={syncSuccessMessage}
            />
          )}

          {currentTab === 'plant-inventory' && (
            <PlantInventoryView
              plants={plants}
              onSelectPlant={(plant) => setSelectedPlantDetail(plant)}
              onWaterPlant={handleWaterPlant}
              onOpenAddPlant={() => setIsAddPlantOpen(true)}
              searchQuery={searchQuery}
            />
          )}

          {currentTab === 'watering-calendar' && (
            <WateringCalendarView
              plants={plants}
              onWaterPlant={handleWaterPlant}
              onOpenLogCare={() => setIsLogCareOpen(true)}
            />
          )}

          {currentTab === 'sunlight-and-environment' && (
            <EnvironmentView
              zones={zones}
              onSyncSensors={handleSyncSensors}
              isSyncing={isSyncing}
              syncSuccessMessage={syncSuccessMessage}
            />
          )}

          {currentTab === 'fertilization-and-nutrients' && (
            <FertilizationView
              nutrients={nutrients}
              onOpenLogCare={() => setIsLogCareOpen(true)}
            />
          )}

          {currentTab === 'care-history' && (
            <CareHistoryView
              logs={logs}
              onOpenLogCare={() => setIsLogCareOpen(true)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              currentSeason={currentSeason}
              onSeasonChange={setCurrentSeason}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <AddPlantModal
        isOpen={isAddPlantOpen}
        onClose={() => setIsAddPlantOpen(false)}
        onAddPlant={handleAddPlant}
      />

      <LogCareModal
        isOpen={isLogCareOpen}
        onClose={() => setIsLogCareOpen(false)}
        plants={plants}
        onLogCare={handleLogCare}
      />

      <PlantDetailModal
        plant={selectedPlantDetail}
        onClose={() => setSelectedPlantDetail(null)}
        onWaterPlant={handleWaterPlant}
        onFeedPlant={handleFeedPlant}
      />
    </div>
  );
}
