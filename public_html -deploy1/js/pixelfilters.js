var pixelFiltersInit = function () {
    if (codeArtStage != null) {
        codeArtStage.pixelFilters = {};
        codeArtStage.pixelFilters.invert3 = function (pixel) {
            //  The incoming pixel values
            var r = pixel.r;
            var g = pixel.g;
            var b = pixel.b;
            var a = pixel.a;
            //  And let's mix them up a bit
            pixel.r = 255;
            pixel.g = 255;
            pixel.b = 255;
            pixel.a = 255 - (r + g + b) / 3;
            return pixel;
        };
        codeArtStage.pixelFilters.toBgColorInvert3 = function (pixel) {
            //  The incoming pixel values
            var r = pixel.r;
            var g = pixel.g;
            var b = pixel.b;
            var a = pixel.a;
            //  And let's mix them up a bit
            pixel.r = codeArtStage.bgColor.r;
            pixel.g = codeArtStage.bgColor.g;
            pixel.b = codeArtStage.bgColor.b;
            pixel.a = 255 - (r + g + b) / 3;
            return pixel;
        };
        codeArtStage.pixelFilters.toAColor = function (pixel) {
            //  The incoming pixel values
            var r = pixel.r;
            var g = pixel.g;
            var b = pixel.b;
            var a = pixel.a;
            //  And let's mix them up a bit
            pixel.r = codeArtStage.aColor.r;
            pixel.g = codeArtStage.aColor.g;
            pixel.b = codeArtStage.aColor.b;
            return pixel;
        };
        codeArtStage.pixelFilters.toBColor = function (pixel) {
            //  The incoming pixel values
            var r = pixel.r;
            var g = pixel.g;
            var b = pixel.b;
            var a = pixel.a;
            //  And let's mix them up a bit
            pixel.r = codeArtStage.bColor.r;
            pixel.g = codeArtStage.bColor.g;
            pixel.b = codeArtStage.bColor.b;
            //pixel.a = (r + g + b) / 3;
            return pixel;
        };
        codeArtStage.pixelFilters.toCurrentColor = function (pixel) {
            //  The incoming pixel values
            var r = pixel.r;
            var g = pixel.g;
            var b = pixel.b;
            var a = pixel.a;
            //  And let's mix them up a bit
            pixel.r = codeArtStage.currentColor.r;
            pixel.g = codeArtStage.currentColor.g;
            pixel.b = codeArtStage.currentColor.b;
            //pixel.a = (r + g + b) / 3;
            return pixel;
        };
    }
};