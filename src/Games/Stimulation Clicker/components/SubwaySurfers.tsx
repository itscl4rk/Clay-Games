import video from "../gameplay.mp4";

const SubwaySurfers = ({ isUnlocked }: { isUnlocked: boolean }) => {
  if (!isUnlocked) return null;
  return (
    <div className="fixed bottom-0 right-0 z-100">
      <video width="300" height="300" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SubwaySurfers;
