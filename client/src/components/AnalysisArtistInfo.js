export default function AnalysisArtistInfo({ desc, artist }) {
  return (
    <div>
      <p>{desc}</p>
      <img src={artist} alt="#" />
    </div>
  );
}
