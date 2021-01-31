import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";

const ResultsCircle = ({ degree, text }) => {
  const mainCircle = useRef(null);
  const insideCircle = useRef(null);
  const [size, setSize] = useState(0);
  const [insideSize, setInsideSize] = useState(0);

  useEffect(() => {
    const size = mainCircle.current ? mainCircle.current.offsetWidth : 0;
    setSize(size);
  }, [mainCircle, size])

  useEffect(() => {
    const insideSize = insideCircle.current ? insideCircle.current.offsetHeight : 0;
    setInsideSize(insideSize);
  }, [insideCircle, insideSize])

  return (
    <div 
      className = "w-100 border border-warning rounded-circle"
      id="main-circle"
      ref = { mainCircle }
      style = {{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        height: size,
        position: 'relative'
      }}
    >
        {
          size && (
            <Fragment>
              <div 
                id = "mask-left"
                className = "w-100 h-100 rounded-circle"
                style = {{
                  position: 'absolute',
                  clip: `rect(0px, ${size}px, ${size}px, ${size / 2}px)`,
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >     
                <div
                  className = "w-100 h-100 rounded-circle"
                  style = {{
                    position: 'absolute',
                    clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
                    background: "#ffc107",
                    WebkitBackfaceVisibility: 'hidden',
                    transform: `rotate(${degree / 2}deg)`,
                  }}
                >

                </div>
              </div>
              <div 
                id = "mask-right"
                className = "w-100 h-100 rounded-circle"
                style = {{
                  position: 'absolute',
                  clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
                  // background: "#6610f2",
                  transform: `rotate(-${(360 - degree) / 2}deg)`,

                  WebkitBackfaceVisibility: 'hidden',
                }}
                >     
                <div
                  className = "w-100 h-100 rounded-circle"
                  style = {{
                    position: 'absolute',
                    clip: `rect(0px, ${size}px, ${size}px, ${size / 2}px)`,
                    background: "#ffc107",
                    WebkitBackfaceVisibility: 'hidden',
                    transform: `rotate(${degree / 2}deg)`,
                  }}
                >

                </div>
              </div>

              <div 
                className = "border border-warning rounded-circle"
                id="inside-circle"
                ref = { insideCircle }
                style = {{
                  width: insideSize,
                  height: "90%",
                  background: "#fff",
                  zIndex: "2"
                }}
              >
                <div 
                  className = "w-100 h-100"
                  style = {{
                    display: "grid",
                    alignItems: "center",
                  }}
                >
                  { text }
                </div>
              </div>
            </Fragment>
          )
        }
    </div>
  )
}

export default ResultsCircle;