import React, { forwardRef } from "react";
import satelliteIllustration from "../../assets/satellite.svg";

type SatelliteImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const SatelliteImage = forwardRef<HTMLImageElement, SatelliteImageProps>((props, ref) => {
    const { alt = "Satellite illustration", loading = "lazy", draggable = false, ...rest } = props;

    return (
        <img
            ref={ref}
            src={satelliteIllustration}
            alt={alt}
            loading={loading}
            draggable={draggable}
            {...rest}
        />
    );
});

SatelliteImage.displayName = "SatelliteImage";

export { SatelliteImage };
