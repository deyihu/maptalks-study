/*!
 * gifloop v0.5.0
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.gifloop = global.gifloop || {}));
}(this, function (exports) { 'use strict';

	function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loop = exports.conditional = exports.parse = void 0;

	var parse = function parse(stream, schema) {
	  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : result;

	  if (Array.isArray(schema)) {
	    schema.forEach(function (partSchema) {
	      return parse(stream, partSchema, result, parent);
	    });
	  } else if (typeof schema === 'function') {
	    schema(stream, result, parent, parse);
	  } else {
	    var key = Object.keys(schema)[0];

	    if (Array.isArray(schema[key])) {
	      parent[key] = {};
	      parse(stream, schema[key], result, parent[key]);
	    } else {
	      parent[key] = schema[key](stream, result, parent, parse);
	    }
	  }

	  return result;
	};

	exports.parse = parse;

	var conditional = function conditional(schema, conditionFunc) {
	  return function (stream, result, parent, parse) {
	    if (conditionFunc(stream, result, parent)) {
	      parse(stream, schema, result, parent);
	    }
	  };
	};

	exports.conditional = conditional;

	var loop = function loop(schema, continueFunc) {
	  return function (stream, result, parent, parse) {
	    var arr = [];
	    var lastStreamPos = stream.pos;

	    while (continueFunc(stream, result, parent)) {
	      var newParent = {};
	      parse(stream, schema, result, newParent); // cases when whole file is parsed but no termination is there and stream position is not getting updated as well
	      // it falls into infinite recursion, null check to avoid the same

	      if (stream.pos === lastStreamPos) {
	        break;
	      }

	      lastStreamPos = stream.pos;
	      arr.push(newParent);
	    }

	    return arr;
	  };
	};

	exports.loop = loop;
	});

	var index = unwrapExports(lib);
	var lib_1 = lib.loop;
	var lib_2 = lib.conditional;
	var lib_3 = lib.parse;

	var lib$1 = /*#__PURE__*/Object.freeze({
		default: index,
		__moduleExports: lib,
		loop: lib_1,
		conditional: lib_2,
		parse: lib_3
	});

	var uint8 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.readBits = exports.readArray = exports.readUnsigned = exports.readString = exports.peekBytes = exports.readBytes = exports.peekByte = exports.readByte = exports.buildStream = void 0;

	// Default stream and parsers for Uint8TypedArray data type
	var buildStream = function buildStream(uint8Data) {
	  return {
	    data: uint8Data,
	    pos: 0
	  };
	};

	exports.buildStream = buildStream;

	var readByte = function readByte() {
	  return function (stream) {
	    return stream.data[stream.pos++];
	  };
	};

	exports.readByte = readByte;

	var peekByte = function peekByte() {
	  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  return function (stream) {
	    return stream.data[stream.pos + offset];
	  };
	};

	exports.peekByte = peekByte;

	var readBytes = function readBytes(length) {
	  return function (stream) {
	    return stream.data.subarray(stream.pos, stream.pos += length);
	  };
	};

	exports.readBytes = readBytes;

	var peekBytes = function peekBytes(length) {
	  return function (stream) {
	    return stream.data.subarray(stream.pos, stream.pos + length);
	  };
	};

	exports.peekBytes = peekBytes;

	var readString = function readString(length) {
	  return function (stream) {
	    return Array.from(readBytes(length)(stream)).map(function (value) {
	      return String.fromCharCode(value);
	    }).join('');
	  };
	};

	exports.readString = readString;

	var readUnsigned = function readUnsigned(littleEndian) {
	  return function (stream) {
	    var bytes = readBytes(2)(stream);
	    return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
	  };
	};

	exports.readUnsigned = readUnsigned;

	var readArray = function readArray(byteSize, totalOrFunc) {
	  return function (stream, result, parent) {
	    var total = typeof totalOrFunc === 'function' ? totalOrFunc(stream, result, parent) : totalOrFunc;
	    var parser = readBytes(byteSize);
	    var arr = new Array(total);

	    for (var i = 0; i < total; i++) {
	      arr[i] = parser(stream);
	    }

	    return arr;
	  };
	};

	exports.readArray = readArray;

	var subBitsTotal = function subBitsTotal(bits, startIndex, length) {
	  var result = 0;

	  for (var i = 0; i < length; i++) {
	    result += bits[startIndex + i] && Math.pow(2, length - i - 1);
	  }

	  return result;
	};

	var readBits = function readBits(schema) {
	  return function (stream) {
	    var _byte = readByte()(stream); // convert the byte to bit array


	    var bits = new Array(8);

	    for (var i = 0; i < 8; i++) {
	      bits[7 - i] = !!(_byte & 1 << i);
	    } // convert the bit array to values based on the schema


	    return Object.keys(schema).reduce(function (res, key) {
	      var def = schema[key];

	      if (def.length) {
	        res[key] = subBitsTotal(bits, def.index, def.length);
	      } else {
	        res[key] = bits[def.index];
	      }

	      return res;
	    }, {});
	  };
	};

	exports.readBits = readBits;
	});

	var uint8$1 = unwrapExports(uint8);
	var uint8_1 = uint8.readBits;
	var uint8_2 = uint8.readArray;
	var uint8_3 = uint8.readUnsigned;
	var uint8_4 = uint8.readString;
	var uint8_5 = uint8.peekBytes;
	var uint8_6 = uint8.readBytes;
	var uint8_7 = uint8.peekByte;
	var uint8_8 = uint8.readByte;
	var uint8_9 = uint8.buildStream;

	var uint8$2 = /*#__PURE__*/Object.freeze({
		default: uint8$1,
		__moduleExports: uint8,
		readBits: uint8_1,
		readArray: uint8_2,
		readUnsigned: uint8_3,
		readString: uint8_4,
		peekBytes: uint8_5,
		readBytes: uint8_6,
		peekByte: uint8_7,
		readByte: uint8_8,
		buildStream: uint8_9
	});

	var _ = ( lib$1 && index ) || lib$1;

	var _uint = ( uint8$2 && uint8$1 ) || uint8$2;

	var gif = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;





	// a set of 0x00 terminated subblocks
	var subBlocksSchema = {
	  blocks: function blocks(stream) {
	    var terminator = 0x00;
	    var chunks = [];
	    var streamSize = stream.data.length;
	    var total = 0;

	    for (var size = (0, _uint.readByte)()(stream); size !== terminator; size = (0, _uint.readByte)()(stream)) {
	      // size becomes undefined for some case when file is corrupted and  terminator is not proper 
	      // null check to avoid recursion
	      if (!size) break; // catch corrupted files with no terminator

	      if (stream.pos + size >= streamSize) {
	        var availableSize = streamSize - stream.pos;
	        chunks.push((0, _uint.readBytes)(availableSize)(stream));
	        total += availableSize;
	        break;
	      }

	      chunks.push((0, _uint.readBytes)(size)(stream));
	      total += size;
	    }

	    var result = new Uint8Array(total);
	    var offset = 0;

	    for (var i = 0; i < chunks.length; i++) {
	      result.set(chunks[i], offset);
	      offset += chunks[i].length;
	    }

	    return result;
	  }
	}; // global control extension

	var gceSchema = (0, _.conditional)({
	  gce: [{
	    codes: (0, _uint.readBytes)(2)
	  }, {
	    byteSize: (0, _uint.readByte)()
	  }, {
	    extras: (0, _uint.readBits)({
	      future: {
	        index: 0,
	        length: 3
	      },
	      disposal: {
	        index: 3,
	        length: 3
	      },
	      userInput: {
	        index: 6
	      },
	      transparentColorGiven: {
	        index: 7
	      }
	    })
	  }, {
	    delay: (0, _uint.readUnsigned)(true)
	  }, {
	    transparentColorIndex: (0, _uint.readByte)()
	  }, {
	    terminator: (0, _uint.readByte)()
	  }]
	}, function (stream) {
	  var codes = (0, _uint.peekBytes)(2)(stream);
	  return codes[0] === 0x21 && codes[1] === 0xf9;
	}); // image pipeline block

	var imageSchema = (0, _.conditional)({
	  image: [{
	    code: (0, _uint.readByte)()
	  }, {
	    descriptor: [{
	      left: (0, _uint.readUnsigned)(true)
	    }, {
	      top: (0, _uint.readUnsigned)(true)
	    }, {
	      width: (0, _uint.readUnsigned)(true)
	    }, {
	      height: (0, _uint.readUnsigned)(true)
	    }, {
	      lct: (0, _uint.readBits)({
	        exists: {
	          index: 0
	        },
	        interlaced: {
	          index: 1
	        },
	        sort: {
	          index: 2
	        },
	        future: {
	          index: 3,
	          length: 2
	        },
	        size: {
	          index: 5,
	          length: 3
	        }
	      })
	    }]
	  }, (0, _.conditional)({
	    lct: (0, _uint.readArray)(3, function (stream, result, parent) {
	      return Math.pow(2, parent.descriptor.lct.size + 1);
	    })
	  }, function (stream, result, parent) {
	    return parent.descriptor.lct.exists;
	  }), {
	    data: [{
	      minCodeSize: (0, _uint.readByte)()
	    }, subBlocksSchema]
	  }]
	}, function (stream) {
	  return (0, _uint.peekByte)()(stream) === 0x2c;
	}); // plain text block

	var textSchema = (0, _.conditional)({
	  text: [{
	    codes: (0, _uint.readBytes)(2)
	  }, {
	    blockSize: (0, _uint.readByte)()
	  }, {
	    preData: function preData(stream, result, parent) {
	      return (0, _uint.readBytes)(parent.text.blockSize)(stream);
	    }
	  }, subBlocksSchema]
	}, function (stream) {
	  var codes = (0, _uint.peekBytes)(2)(stream);
	  return codes[0] === 0x21 && codes[1] === 0x01;
	}); // application block

	var applicationSchema = (0, _.conditional)({
	  application: [{
	    codes: (0, _uint.readBytes)(2)
	  }, {
	    blockSize: (0, _uint.readByte)()
	  }, {
	    id: function id(stream, result, parent) {
	      return (0, _uint.readString)(parent.blockSize)(stream);
	    }
	  }, subBlocksSchema]
	}, function (stream) {
	  var codes = (0, _uint.peekBytes)(2)(stream);
	  return codes[0] === 0x21 && codes[1] === 0xff;
	}); // comment block

	var commentSchema = (0, _.conditional)({
	  comment: [{
	    codes: (0, _uint.readBytes)(2)
	  }, subBlocksSchema]
	}, function (stream) {
	  var codes = (0, _uint.peekBytes)(2)(stream);
	  return codes[0] === 0x21 && codes[1] === 0xfe;
	});
	var schema = [{
	  header: [{
	    signature: (0, _uint.readString)(3)
	  }, {
	    version: (0, _uint.readString)(3)
	  }]
	}, {
	  lsd: [{
	    width: (0, _uint.readUnsigned)(true)
	  }, {
	    height: (0, _uint.readUnsigned)(true)
	  }, {
	    gct: (0, _uint.readBits)({
	      exists: {
	        index: 0
	      },
	      resolution: {
	        index: 1,
	        length: 3
	      },
	      sort: {
	        index: 4
	      },
	      size: {
	        index: 5,
	        length: 3
	      }
	    })
	  }, {
	    backgroundColorIndex: (0, _uint.readByte)()
	  }, {
	    pixelAspectRatio: (0, _uint.readByte)()
	  }]
	}, (0, _.conditional)({
	  gct: (0, _uint.readArray)(3, function (stream, result) {
	    return Math.pow(2, result.lsd.gct.size + 1);
	  })
	}, function (stream, result) {
	  return result.lsd.gct.exists;
	}), // content frames
	{
	  frames: (0, _.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function (stream) {
	    var nextCode = (0, _uint.peekByte)()(stream); // rather than check for a terminator, we should check for the existence
	    // of an ext or image block to avoid infinite loops
	    //var terminator = 0x3B;
	    //return nextCode !== terminator;

	    return nextCode === 0x21 || nextCode === 0x2c;
	  })
	}];
	var _default = schema;
	exports["default"] = _default;
	});

	var gif$1 = unwrapExports(gif);

	var gif$2 = /*#__PURE__*/Object.freeze({
		default: gif$1,
		__moduleExports: gif
	});

	var deinterlace_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deinterlace = void 0;

	/**
	 * Deinterlace function from https://github.com/shachaf/jsgif
	 */
	var deinterlace = function deinterlace(pixels, width) {
	  var newPixels = new Array(pixels.length);
	  var rows = pixels.length / width;

	  var cpRow = function cpRow(toRow, fromRow) {
	    var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
	    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
	  }; // See appendix E.


	  var offsets = [0, 4, 2, 1];
	  var steps = [8, 8, 4, 2];
	  var fromRow = 0;

	  for (var pass = 0; pass < 4; pass++) {
	    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
	      cpRow(toRow, fromRow);
	      fromRow++;
	    }
	  }

	  return newPixels;
	};

	exports.deinterlace = deinterlace;
	});

	var deinterlace = unwrapExports(deinterlace_1);
	var deinterlace_2 = deinterlace_1.deinterlace;

	var deinterlace$1 = /*#__PURE__*/Object.freeze({
		default: deinterlace,
		__moduleExports: deinterlace_1,
		deinterlace: deinterlace_2
	});

	var lzw_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lzw = void 0;

	/**
	 * javascript port of java LZW decompression
	 * Original java author url: https://gist.github.com/devunwired/4479231
	 */
	var lzw = function lzw(minCodeSize, data, pixelCount) {
	  var MAX_STACK_SIZE = 4096;
	  var nullCode = -1;
	  var npix = pixelCount;
	  var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
	  var dstPixels = new Array(pixelCount);
	  var prefix = new Array(MAX_STACK_SIZE);
	  var suffix = new Array(MAX_STACK_SIZE);
	  var pixelStack = new Array(MAX_STACK_SIZE + 1); // Initialize GIF data stream decoder.

	  data_size = minCodeSize;
	  clear = 1 << data_size;
	  end_of_information = clear + 1;
	  available = clear + 2;
	  old_code = nullCode;
	  code_size = data_size + 1;
	  code_mask = (1 << code_size) - 1;

	  for (code = 0; code < clear; code++) {
	    prefix[code] = 0;
	    suffix[code] = code;
	  } // Decode GIF pixel stream.


	  var datum, bits, count, first, top, pi, bi;
	  datum = bits = count = first = top = pi = bi = 0;

	  for (i = 0; i < npix;) {
	    if (top === 0) {
	      if (bits < code_size) {
	        // get the next byte
	        datum += data[bi] << bits;
	        bits += 8;
	        bi++;
	        continue;
	      } // Get the next code.


	      code = datum & code_mask;
	      datum >>= code_size;
	      bits -= code_size; // Interpret the code

	      if (code > available || code == end_of_information) {
	        break;
	      }

	      if (code == clear) {
	        // Reset decoder.
	        code_size = data_size + 1;
	        code_mask = (1 << code_size) - 1;
	        available = clear + 2;
	        old_code = nullCode;
	        continue;
	      }

	      if (old_code == nullCode) {
	        pixelStack[top++] = suffix[code];
	        old_code = code;
	        first = code;
	        continue;
	      }

	      in_code = code;

	      if (code == available) {
	        pixelStack[top++] = first;
	        code = old_code;
	      }

	      while (code > clear) {
	        pixelStack[top++] = suffix[code];
	        code = prefix[code];
	      }

	      first = suffix[code] & 0xff;
	      pixelStack[top++] = first; // add a new string to the table, but only if space is available
	      // if not, just continue with current table until a clear code is found
	      // (deferred clear code implementation as per GIF spec)

	      if (available < MAX_STACK_SIZE) {
	        prefix[available] = old_code;
	        suffix[available] = first;
	        available++;

	        if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
	          code_size++;
	          code_mask += available;
	        }
	      }

	      old_code = in_code;
	    } // Pop a pixel off the pixel stack.


	    top--;
	    dstPixels[pi++] = pixelStack[top];
	    i++;
	  }

	  for (i = pi; i < npix; i++) {
	    dstPixels[i] = 0; // clear missing pixels
	  }

	  return dstPixels;
	};

	exports.lzw = lzw;
	});

	var lzw = unwrapExports(lzw_1);
	var lzw_2 = lzw_1.lzw;

	var lzw$1 = /*#__PURE__*/Object.freeze({
		default: lzw,
		__moduleExports: lzw_1,
		lzw: lzw_2
	});

	var require$$0 = ( gif$2 && gif$1 ) || gif$2;

	var _deinterlace = ( deinterlace$1 && deinterlace ) || deinterlace$1;

	var _lzw = ( lzw$1 && lzw ) || lzw$1;

	var lib$2 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decompressFrames = exports.decompressFrame = exports.parseGIF = void 0;

	var _gif = _interopRequireDefault(require$$0);









	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var parseGIF = function parseGIF(arrayBuffer) {
	  var byteData = new Uint8Array(arrayBuffer);
	  return (0, _.parse)((0, _uint.buildStream)(byteData), _gif["default"]);
	};

	exports.parseGIF = parseGIF;

	var generatePatch = function generatePatch(image) {
	  var totalPixels = image.pixels.length;
	  var patchData = new Uint8ClampedArray(totalPixels * 4);

	  for (var i = 0; i < totalPixels; i++) {
	    var pos = i * 4;
	    var colorIndex = image.pixels[i];
	    var color = image.colorTable[colorIndex] || [0, 0, 0];
	    patchData[pos] = color[0];
	    patchData[pos + 1] = color[1];
	    patchData[pos + 2] = color[2];
	    patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
	  }

	  return patchData;
	};

	var decompressFrame = function decompressFrame(frame, gct, buildImagePatch) {
	  if (!frame.image) {
	    console.warn('gif frame does not have associated image.');
	    return;
	  }

	  var image = frame.image; // get the number of pixels

	  var totalPixels = image.descriptor.width * image.descriptor.height; // do lzw decompression

	  var pixels = (0, _lzw.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels); // deal with interlacing if necessary

	  if (image.descriptor.lct.interlaced) {
	    pixels = (0, _deinterlace.deinterlace)(pixels, image.descriptor.width);
	  }

	  var resultImage = {
	    pixels: pixels,
	    dims: {
	      top: frame.image.descriptor.top,
	      left: frame.image.descriptor.left,
	      width: frame.image.descriptor.width,
	      height: frame.image.descriptor.height
	    }
	  }; // color table

	  if (image.descriptor.lct && image.descriptor.lct.exists) {
	    resultImage.colorTable = image.lct;
	  } else {
	    resultImage.colorTable = gct;
	  } // add per frame relevant gce information


	  if (frame.gce) {
	    resultImage.delay = (frame.gce.delay || 10) * 10; // convert to ms

	    resultImage.disposalType = frame.gce.extras.disposal; // transparency

	    if (frame.gce.extras.transparentColorGiven) {
	      resultImage.transparentIndex = frame.gce.transparentColorIndex;
	    }
	  } // create canvas usable imagedata if desired


	  if (buildImagePatch) {
	    resultImage.patch = generatePatch(resultImage);
	  }

	  return resultImage;
	};

	exports.decompressFrame = decompressFrame;

	var decompressFrames = function decompressFrames(parsedGif, buildImagePatches) {
	  return parsedGif.frames.filter(function (f) {
	    return f.image;
	  }).map(function (f) {
	    return decompressFrame(f, parsedGif.gct, buildImagePatches);
	  });
	};

	exports.decompressFrames = decompressFrames;
	});

	unwrapExports(lib$2);
	var lib_1$1 = lib$2.decompressFrames;
	var lib_2$1 = lib$2.decompressFrame;
	var lib_3$1 = lib$2.parseGIF;

	let canvas, offscreenCanvas;
	function getCanvas() {
	    if (canvas) {
	        return canvas;
	    }
	    canvas = document.createElement('canvas');
	    return canvas;
	}

	function getOffscreenCanvas() {
	    if (offscreenCanvas) {
	        return offscreenCanvas;
	    }
	    if (OffscreenCanvas) {
	        offscreenCanvas = new OffscreenCanvas(10, 10);
	    }
	    return offscreenCanvas;
	}

	function putImageData(canvas, frame, gif) {
	    const { maxWidth, maxHeight } = gif;
	    canvas.width = maxWidth;
	    canvas.height = maxHeight;
	    const ctx = canvas.getContext('2d');
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    const { patch, left, top, width, height } = frame;
	    const imageData = new ImageData(patch, width, height);
	    ctx.putImageData(imageData, left, top);
	    frame.maxWidth = maxWidth;
	    frame.maxHeight = maxHeight;
	}

	function initFrameDataURL(frame, gif) {
	    const canvas = getCanvas();
	    putImageData(canvas, frame, gif);
	    frame.dataURL = canvas.toDataURL();

	    const offCanvas = getOffscreenCanvas();
	    if (offCanvas) {
	        putImageData(offCanvas, frame, gif);
	        frame.imageBitMap = offCanvas.transferToImageBitmap();
	    }
	}

	const gifCollection = [];

	function frameLoop(timeStamp) {
	    gifCollection.forEach(gif => {
	        const frames = gif.frames;
	        if (!gif.loaded || !gif._playing || !frames || frames.length === 0) {
	            return;
	        }
	        if (gif._idx === frames.length) {
	            gif._idx = 0;
	        }
	        const frame = frames[gif._idx];
	        frame.index = gif._idx;
	        if (!frame.dataURL) {
	            initFrameDataURL(frame, gif);
	        }
	        if (!gif._time) {
	            gif._time = timeStamp;
	            gif._idx++;
	            gif._mitt.emit('frame', frame);
	        } else {
	            if (timeStamp - gif._time >= gif.options.loopTime) {
	                gif._time = timeStamp;
	                gif._idx++;
	                gif._mitt.emit('frame', frame);
	            }
	        }
	    });
	    requestAnimationFrame(frameLoop);
	}
	setTimeout(() => {
	    requestAnimationFrame(frameLoop);
	}, 16);

	const GIFCache = {};

	class GIF {
	    constructor(options) {
	        this.options = Object.assign({}, { loopTime: 70 }, options);
	        this.options.loopTime = Math.max(17, this.options.loopTime);
	        this._mitt = mitt();
	        this._idx = 0;
	        this._playing = true;
	        this.loaded = false;
	        this.frames = [];
	        if (!options.url) {
	            console.error('not find gif url');
	        } else {

	            const init = () => {
	                let maxWidth = 0, maxHeight = 0;
	                this.frames.forEach(frame => {
	                    const { width, height, left, top } = frame.dims;
	                    maxWidth = Math.max(maxWidth, width + left);
	                    maxHeight = Math.max(maxHeight, height + top);
	                    frame.gif = this;
	                    Object.assign(frame, frame.dims);
	                });
	                this.maxWidth = maxWidth;
	                this.maxHeight = maxHeight;
	            };
	            if (GIFCache[options.url]) {
	                this.frames = GIFCache[options.url];
	                init();
	                gifCollection.push(this);
	                this.loaded = true;
	            } else {
	                fetch(options.url).then(res => res.arrayBuffer()).then(arrayBuffer => {
	                    const gif = lib_3$1(arrayBuffer);
	                    const frames = lib_1$1(gif, true);
	                    GIFCache[options.url] = frames;
	                    this.frames = frames;
	                    init();
	                    this.frames.forEach(frame => {
	                        initFrameDataURL(frame, this);
	                    });
	                    gifCollection.push(this);
	                    this.loaded = true;
	                }).catch(error => {
	                    console.error(error);
	                });
	            }
	        }
	    }

	    config(options = {}) {
	        this.options = Object.assign(this.options, options);
	        return this;
	    }

	    on(eventType, handler) {
	        this._mitt.on(eventType, handler);
	        return this;
	    }

	    off(eventType, handler) {
	        this._mitt.off(eventType, handler);
	        return this;
	    }

	    play() {
	        this._playing = true;
	        return this;
	    }

	    pause() {
	        this._playing = false;
	        return this;
	    }

	    isPlay() {
	        return this._playing;
	    }

	    dispose() {
	        const index = gifCollection.indexOf(this);
	        if (index > -1) {
	            gifCollection.splice(index, 1);
	        }
	        this._mitt.all.clear();
	        this.frames = null;
	        return this;
	    }
	}

	exports.GIF = GIF;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gifloop.js.map
