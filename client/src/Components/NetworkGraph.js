import React, { memo, useState, useEffect } from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from 'uuid'

const options = {
  manipulation: {
    addNode: true
  },
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  nodes: {
    physics: false
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const NetworkGraph = () => {

  const createNode = (x, y) => {
    graph.nodes.forEach(node => console.log(node.id))
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      // console.log(id)
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Node ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from: from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }

  // const [graphKey, setGraphKey] = useState([]);
  const [meterNo, setMeterNo] = useState([]);
  useEffect(() => {
    fetch('./measPts')
      .then(response => {
        return response.json();

      })
      .then(measuredPtsData => {

        setMeterNo(measuredPtsData.recordsets[0][1].METERNO);
        // setGraphKey(measuredPtsData.recordsets[0][0]);
        console.log(meterNo);
        // console.log(measuredPtsData.recordsets[0][1].EFFDATE);
        console.log(measuredPtsData.recordsets[0][0]);
      })
  }, []);


  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        {
          id: 1, label: meterNo, color: '#ff0000',
        },
        { id: 2, label: "Node 2", color: "#e09c41" },
        { id: 3, label: "Node 3", color: "#e0df41" },
        { id: 4, label: "Node 4", color: "#7be041" },
        { id: 5, label: "Node 5", color: "#41e0c9" }
      ],
      // nodes: [
      //   { id: 1, label: "Node 1", color: "#e04141", graphKey },
      //   { id: 2, label: "Node 2", color: "#e09c41", graphKey },
      //   { id: 3, label: "Node 3", color: "#e0df41", graphKey },
      //   { id: 4, label: "Node 4", color: "#7be041", graphKey },
      //   { id: 5, label: "Node 5", color: "#41e0c9", graphKey }
      // ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    },

    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        // alert("Selected node: " + nodes);
      },
      // doubleClick: ({ pointer: { canvas } }) => {
      //   createNode(canvas.x, canvas.y,);
      // }
    }
  })

  const { graph, events } = state;
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col-lg-6">
          <Graph key={uuidv4()} graph={graph} options={options} events={events} />
        </div>
      </div>
    </div>
  );

}

export default memo(NetworkGraph)