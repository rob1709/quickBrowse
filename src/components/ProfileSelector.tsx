import { QuickBrowseProfile } from "../model/QuickBrowseProfile";
import '../styles/profileSelector.css';

interface ProfileSelectorProps {
  profiles: QuickBrowseProfile[];
  activeProfile: QuickBrowseProfile;
  onSelectionChanged: (profile: QuickBrowseProfile) => void;
}

export function ProfileSelector({ profiles, onSelectionChanged, activeProfile }: ProfileSelectorProps) {
  return (
    <div className="profile-selector-bar">
      {profiles.map((profile, index) => (
        <span
          key={index}
          className={"profileSelector" + (profile === activeProfile ? " active" : "")}
          onClick={() => onSelectionChanged(profile)}
        >
          <i className={"fa " + profile.icon + " profileIcon"}></i>
          {profile.name}
        </span>
      ))}
    </div>
  );
}