// components/MapView.tsx
import React from "react";

const MapView: React.FC = () => {
  return (
    <div className="flex flex-row gap-4 p-1">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6968888182696!2d-40.851389025191885!3d-2.90337559707306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997e7e00c5ad09%3A0x9212268fcfb0fa30!2sSAAE%20-%20Servi%C3%A7o%20Aut%C3%B4nomo%20de%20%C3%81gua%20e%20Esgoto!5e0!3m2!1spt-BR!2sbr!4v1714657963103!5m2!1spt-BR!2sbr"
        width="100%"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <iframe
        src="https://www.google.com/maps/embed?pb=!4v1714658835563!6m8!1m7!1srIJh_uhrFZGPspUnDObCcQ!2m2!1d-2.903319504809374!2d-40.84887251396695!3f178.3111421523338!4f-1.063764798363806!5f0.7820865974627469"
        width="100%"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapView;
