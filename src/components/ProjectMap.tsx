"use client"

import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, toLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { MapBrowserEvent } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { defaults as defaultControls } from 'ol/control';
import { BingMaps, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Style } from 'ol/style';
import { EpanetNode, Node, Junction } from '@/interfaces';
import JunctionModal from './JunctionModal';
import axios from 'axios';
import 'ol/ol.css';
import FloatingTool from './FloatingTool';

const ProjectMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedNodeType, setSelectedNodeType] = useState<string>('');
  const vectorSource = useRef(new VectorSource()).current; 
  const [nodes, setNodes] = useState<Node[]>([]);

  const getColorForNodeType = (nodeType: string): string => {
    switch (nodeType) {
      case 'junction': return 'violet';
      case 'tank': return 'blue';
      case 'reservoir': return 'yellow';
      default: return 'black';
    }
  };

  const addNodeToDB = async (longitude: number, latitude: number, type: string) => { 
    try {
      const response = await axios.post('http://localhost:3001/nodes', {
          type: type,
          longitude: longitude,
          latitude: latitude,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const nodeId = response.data.id;
      console.log(nodeId)

      if(type === 'junction') {
        await axios.post('http://localhost:3001/junctions', {
          nodeId: nodeId,
          elevation: 0.00,
          demand: 0.00, 
          demandPattern: ""
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } else if (type === 'tank') {
        await axios.post('http://localhost:3001/tanks', {
          nodeId: nodeId,
          elevation: 0.00,
          initialLevel: 0.00,
          minimumLevel: 0.00,
          maximumLevel: 0.00,
          diameter: 0.00,
          minimumVolume: 0.00, 
          volumeCurve: ""
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      }

    } catch (error) {
      console.log(error)
    }

    fetchNode();
  };

  const fetchNode = async () => {
    try {
       const response = await axios.get('http://localhost:3001/nodes');
       const nodeData = response.data;
       setNodes(nodeData);
    } catch (error) {
       console.error('Error fetching nodes:', error);
    }
  };

  useEffect(() => {
    fetchNode();
  }, []);


  useEffect(() => {
    if (mapRef.current && !map) { 
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            preload: Infinity,
            source: new BingMaps({
              key: 'Ak_uYoz5Csc1Yxu2gxYz2yIE2o4PUXQuODjFhnEfzIKYZkVRB9Lo0X3QIVf2aj0a', 
              imagerySet: 'Aerial', 
              placeholderTiles: false,
            }),
          }),
          new VectorLayer({ source: vectorSource }),
        ],
        view: new View({
          center: fromLonLat([125.1716, 6.1164]),
          zoom: 13,
        }),
        controls: defaultControls({ zoom: false, rotate: false, attribution: false })
      });

      setMap(initialMap);
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const handleSingleClick = async (e: MapBrowserEvent<PointerEvent>) => {
      if (!selectedNodeType) return;

      const coordinate = e.coordinate;
      const [longitude, latitude] = toLonLat(coordinate);
      const pointFeature = new Feature(new Point(coordinate));
      pointFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: getColorForNodeType(selectedNodeType) }),
          }),
        })
      );
      vectorSource.addFeature(pointFeature);
      await addNodeToDB(longitude, latitude, selectedNodeType);
    };

    map.on('singleclick', handleSingleClick);

    return () => {
      map.un('singleclick', handleSingleClick);
    };
  }, [map, selectedNodeType]);

  // rendering the nodes
  useEffect(() => {
    if (map && nodes.length > 0) {
      vectorSource.clear();
      nodes.forEach((node) => {
        const pointFeature = new Feature({
          geometry: new Point(fromLonLat([node.longitude, node.latitude])),
        });

        pointFeature.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 8,
              fill: new Fill({ color: getColorForNodeType(node.type) }),
            }),
          })
        );

        vectorSource.addFeature(pointFeature);
      });
    }
  }, [map, nodes]); 

  return (
    <>
      <FloatingTool onSelectNodeType={setSelectedNodeType}/>
      <div ref={mapRef} style={{ width: '100vw', height: '100vh' }}></div>
    </>
  );
};

export default ProjectMap;
