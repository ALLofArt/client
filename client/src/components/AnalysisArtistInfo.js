import PropTypes from "prop-types";

export default function AnalysisArtistInfo({ desc, artist }) {
  return (
    <div>
      <p>{desc}</p>
      <img src={artist} alt="#" />
      <img src={artist} alt="#" />
      <img src={artist} alt="#" />
    </div>
  );
}

AnalysisArtistInfo.propTypes = {
  desc: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};
