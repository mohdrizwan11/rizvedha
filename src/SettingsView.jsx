import React from 'react';
import { Settings, Moon, Sun, Maximize2, Minimize2, Download, Trash2, Trophy, Flame, Zap } from 'lucide-react';

export default function SettingsView({ data, update, onReset, isFullscreen, onToggleFullscreen }) {
  const downloadBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kosha-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-view">
      <div className="settings-header">
        <div className="eyebrow"><Settings size={15} /> APP CONFIGURATION</div>
        <h1>Settings & Preferences</h1>
        <p>Manage your learning environment, interface themes, offline progress backups, and study targets.</p>
      </div>

      <div className="settings-card-list">
        {/* Appearance */}
        <div className="setting-card">
          <div className="sc-info">
            <b>Interface Theme</b>
            <p>Select your visual mode for comfortable daytime and late-night studying.</p>
          </div>
          <div className="sc-control">
            <button
              className="outline icon-btn-text"
              onClick={() => update(d => ({ ...d, theme: d.theme === 'light' ? 'dark' : 'light' }))}
            >
              {data.theme === 'light' ? <><Moon size={16} /> Switch to Dark</> : <><Sun size={16} /> Switch to Light</>}
            </button>
          </div>
        </div>

        {/* Fullscreen Mode */}
        <div className="setting-card">
          <div className="sc-info">
            <b>Distraction-Free Fullscreen</b>
            <p>Maximize the study workspace to eliminate browser tabs and stay in the zone.</p>
          </div>
          <div className="sc-control">
            <button className="outline icon-btn-text" onClick={onToggleFullscreen}>
              {isFullscreen ? <><Minimize2 size={16} /> Exit Fullscreen</> : <><Maximize2 size={16} /> Enter Fullscreen</>}
            </button>
          </div>
        </div>

        {/* Weekly Study Goal */}
        <div className="setting-card">
          <div className="sc-info">
            <b>Weekly Study Goal</b>
            <p>Target number of active learning days per week.</p>
          </div>
          <div className="sc-control">
            <select
              value={data.goal || 5}
              onChange={e => update(d => ({ ...d, goal: +e.target.value }))}
              className="styled-select"
            >
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <option key={n} value={n}>{n} days / week</option>
              ))}
            </select>
          </div>
        </div>

        {/* Profile / Stats */}
        <div className="setting-card">
          <div className="sc-info">
            <b>Learner Account (Local-First)</b>
            <p>Your progress is encrypted and stored locally in this browser. No personal account or tracking required.</p>
          </div>
          <div className="sc-control stats-preview">
            <span><Flame size={15} color="#ea580c" /> {data.streak || 0}d streak</span>
            <span><Zap size={15} color="#f59e0b" /> {data.xp || 0} XP</span>
          </div>
        </div>

        {/* Data Backup */}
        <div className="setting-card">
          <div className="sc-info">
            <b>Export Learning Data</b>
            <p>Save a JSON backup of your flashcards, scores, mistakes, and spaced repetition schedules.</p>
          </div>
          <div className="sc-control">
            <button className="outline icon-btn-text" onClick={downloadBackup}>
              <Download size={16} /> Download Backup (.json)
            </button>
          </div>
        </div>

        {/* Reset */}
        <div className="setting-card danger-card">
          <div className="sc-info">
            <b>Reset All Local Data</b>
            <p>Permanently erase all progress, XP, answers, and mistakes on this device. This cannot be undone.</p>
          </div>
          <div className="sc-control">
            <button className="danger icon-btn-text" onClick={onReset}>
              <Trash2 size={16} /> Reset Everything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
