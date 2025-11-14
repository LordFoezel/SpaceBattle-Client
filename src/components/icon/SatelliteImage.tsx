import React, { forwardRef } from "react";
import satelliteIllustration from "../../assets/satellite.svg";

type SatelliteImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    flipped?: boolean;
};

const SatelliteImage = forwardRef<HTMLImageElement, SatelliteImageProps>((props, ref) => {
    const {
        alt = "Satellite illustration",
        loading = "lazy",
        draggable = false,
        flipped = false,
        style,
        ...rest
    } = props;

    return (
        <img
            ref={ref}
            src={satelliteIllustration}
            alt={alt}
            loading={loading}
            draggable={draggable}
            style={{
                transform: flipped ? "rotate(180deg)" : undefined,
                transformOrigin: "center",
                ...style,
            }}
            {...rest}
        />
    );
});

SatelliteImage.displayName = "SatelliteImage";

export { SatelliteImage };
