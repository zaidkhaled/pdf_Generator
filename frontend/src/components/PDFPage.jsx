// import React, { useEffect, useRef, useState } from 'react';
// import { Stage, Layer, Image as KonvaImage, Rect, Text, Transformer } from 'react-konva';
// import useImage from 'use-image';


// export default function PDFPage({ imageUrl, pageIndex }) {
//   const [background] = useImage(imageUrl);
//   const [elements, setElements] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const trRef = useRef();
// const [editingText, setEditingText] = useState(null); // { id, text, x, y } أو null
// const textareaRef = useRef();
//   // 🧠 تحديث Transformer للعنصر المحدد
//   useEffect(() => {
//     const selectedNode = elements.find((el) => el.id === selectedId)?.ref?.current;
//     if (trRef.current && selectedNode) {
//       trRef.current.nodes([selectedNode]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [selectedId, elements]);

//   // ✅ دالة لإضافة مستطيل قابل للتحجيم والتحريك
//   const addRect = () => {
//     const id = `rect-${Date.now()}`;
//     const shapeRef = React.createRef();

//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'rect',
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 60,
//         fill: 'rgba(255, 0, 0, 0.3)',
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   // ✅ دالة لإضافة نص قابل للتحريك والتحجيم
//   const addText = () => {
//     const id = `text-${Date.now()}`;
//     const shapeRef = React.createRef();

//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'text',
//         text: 'انقر مرتين للتعديل',
//         x: 120,
//         y: 150,
//         fontSize: 20,
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   // ✅ دالة للحذف
//  const deleteSelected = () => {
//   setElements(elements.filter((el) => el.id !== selectedId));
//   setSelectedId(null);

//   // تفريغ الـ Transformer
//   if (trRef.current) {
//     trRef.current.nodes([]);
//     trRef.current.getLayer().batchDraw();
//   }
// };

//   // ✅ تغيير النص عند الضغط مرتين
// const handleDblClick = (elRef, element) => {
//   const absPos = elRef.current.getAbsolutePosition();

//   setEditingText({
//     id: element.id,
//     text: element.text,
//     x: absPos.x,
//     y: absPos.y,
//     width: element.width || 200,
//     fontSize: element.fontSize || 20,
//   });

//   setTimeout(() => {
//     textareaRef.current.focus();
//   }, 0);
// };



//   return (
//     <div>
//       <div className="flex gap-2 mb-2">
//         <button onClick={addText} className="bg-blue-500 text-white px-2 py-1 rounded">نص</button>
//         <button onClick={addRect} className="bg-green-500 text-white px-2 py-1 rounded">مستطيل</button>
//         <button onClick={deleteSelected} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ حذف</button>
//       </div>

//       <Stage
//         width={800}
//         height={1130}
//         onMouseDown={(e) => {
//           const clickedId = e.target.attrs.id;
//           setSelectedId(clickedId || null);
//         }}
//       >
//         <Layer>
//           {background && (
//             <KonvaImage image={background} width={800} height={1130} />
//           )}

//           {elements.map((el) => {
//             if (el.type === 'rect') {
//               return (
//                 <Rect
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   x={el.x}
//                   y={el.y}
//                   width={el.width}
//                   height={el.height}
//                   fill={el.fill}
//                   draggable={el.draggable}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onTransformEnd={(e) => {
//                     const node = e.target;
//                     const scaleX = node.scaleX();
//                     const scaleY = node.scaleY();

//                     setElements((prev) =>
//                       prev.map((item) =>
//                         item.id === el.id
//                           ? {
//                               ...item,
//                               x: node.x(),
//                               y: node.y(),
//                               width: node.width() * scaleX,
//                               height: node.height() * scaleY,
//                             }
//                           : item
//                       )
//                     );

//                     node.scaleX(1);
//                     node.scaleY(1);
//                   }}
//                 />
//               );
//             }

//             if (el.type === 'text') {
//               return (
//                 <Text
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   x={el.x}
//                   y={el.y}
//                   text={el.text}
//                   fontSize={el.fontSize}
//                   draggable={el.draggable}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onDblClick={() => handleDblClick(el)}
//                 />
//               );
//             }

//             return null;
//           })}

//           <Transformer ref={trRef} />
//         </Layer>
//       </Stage>
//      {editingText && (
//   <textarea
//     ref={textareaRef}
//     value={editingText.text}
//     onChange={(e) =>
//       setEditingText((prev) => ({ ...prev, text: e.target.value }))
//     }
//     onBlur={() => {
//       setElements((prev) =>
//         prev.map((el) =>
//           el.id === editingText.id
//             ? { ...el, text: editingText.text }
//             : el
//         )
//       );
//       setEditingText(null);
//     }}
//     style={{
//       position: 'absolute',
//       top: editingText.y,
//       left: editingText.x,
//       width: editingText.width,
//       fontSize: editingText.fontSize,
//       border: 'none',
//       padding: 0,
//       margin: 0,
//       background: 'transparent',
//       outline: 'none',
//       resize: 'none',
//       overflow: 'hidden',
//       color: 'black',
//     }}
//   />
// )}


//     </div>
//   );
// }




















// import React, { useEffect, useRef, useState } from 'react';
// import { Stage, Layer, Image as KonvaImage, Rect, Text, Transformer } from 'react-konva';
// import useImage from 'use-image';

// export default function PDFPage({ imageUrl, pageIndex }) {
//   const [background] = useImage(imageUrl);
//   const [elements, setElements] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [textValue, setTextValue] = useState('');
//   const trRef = useRef();

//   // ✅ تحديث Transformer عند تغيير التحديد
//   useEffect(() => {
//     const selectedNode = elements.find((el) => el.id === selectedId)?.ref?.current;
//     if (trRef.current && selectedNode) {
//       trRef.current.nodes([selectedNode]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [selectedId, elements]);

//   // ✅ منع التمرير وتحرير النص مباشرة
// useEffect(() => {
//   const handleKeyDown = (e) => {
//     // ✅ حذف العنصر المحدد خارج وضع التحرير
//     if (!editingId) {
//       if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
//         setElements((prev) => prev.filter((el) => el.id !== selectedId));
//         setSelectedId(null);
//         if (trRef.current) {
//           trRef.current.nodes([]);
//           trRef.current.getLayer().batchDraw();
//         }
//       }
//       return;
//     }

//     // 🧠 إذا كنت في وضع التحرير:
//     e.preventDefault();

//     if (e.key === 'Enter' && e.ctrlKey) {
//       setElements((prev) =>
//         prev.map((el) =>
//           el.id === editingId ? { ...el, text: textValue } : el
//         )
//       );
//       setEditingId(null);
//       setTextValue('');
//       setSelectedId(null);
//       if (trRef.current) {
//         trRef.current.nodes([]);
//         trRef.current.getLayer().batchDraw();
//       }
//     } else if (e.key === 'Enter') {
//       setTextValue((prev) => prev + '\n');
//     } else if (e.key === 'Backspace') {
//       setTextValue((prev) => prev.slice(0, -1));
//     } else if (e.key.length === 1) {
//       setTextValue((prev) => prev + e.key);
//     } else if (e.key === 'Escape') {
//       setEditingId(null);
//       setTextValue('');
//       setSelectedId(null);
//       if (trRef.current) {
//         trRef.current.nodes([]);
//         trRef.current.getLayer().batchDraw();
//       }
//     }
//   };

//   window.addEventListener('keydown', handleKeyDown);
//   return () => window.removeEventListener('keydown', handleKeyDown);
// }, [editingId, selectedId, textValue]);


//   // ✅ إضافة مستطيل
//   const addRect = () => {
//     const id = `rect-${Date.now()}`;
//     const shapeRef = React.createRef();
//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'rect',
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 60,
//         fill: 'rgba(255, 0, 0, 0.3)',
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   // ✅ إضافة نص
//   const addText = () => {
//     const id = `text-${Date.now()}`;
//     const shapeRef = React.createRef();
//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'text',
//         text: 'انقر مرتين للتعديل',
//         x: 120,
//         y: 150,
//         fontSize: 20,
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   // ✅ حذف العنصر المحدد
//   const deleteSelected = () => {
//     setElements(elements.filter((el) => el.id !== selectedId));
//     setSelectedId(null);
//     if (trRef.current) {
//       trRef.current.nodes([]);
//       trRef.current.getLayer().batchDraw();
//     }
//   };

//   // ✅ التعديل على النص عند الضغط مرتين
//   const handleDblClick = (element) => {
//     setEditingId(element.id);
//     setTextValue(element.text);
//   };

//   return (
//     <div>
//       <div className="flex gap-2 mb-2">
//         <button onClick={addText} className="bg-blue-500 text-white px-2 py-1 rounded">نص</button>
//         <button onClick={addRect} className="bg-green-500 text-white px-2 py-1 rounded">مستطيل</button>
//         <button onClick={deleteSelected} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ حذف</button>
//       </div>

// <Stage
//   width={800}
//   height={1130}
//   onMouseDown={(e) => {
//     const clicked = e.target;
//     const isEmptyClick = clicked === e.target.getStage() || clicked.getClassName() === 'Layer';

//     if (isEmptyClick) {
//       setSelectedId(null);
//       if (trRef.current) {
//         trRef.current.nodes([]);
//         trRef.current.getLayer().batchDraw();
//       }
//     } else {
//       const clickedId = clicked.attrs.id;
//       setSelectedId(clickedId || null);
//     }
//   }}
// >

      
//         <Layer>
//           {background && <KonvaImage image={background} width={800} height={1130} />}
//           {elements.map((el) => {
//             if (el.type === 'rect') {
//               return (
//                 <Rect
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   {...el}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onTransformEnd={(e) => {
//                     const node = e.target;
//                     const scaleX = node.scaleX();
//                     const scaleY = node.scaleY();
//                     node.scaleX(1);
//                     node.scaleY(1);
//                     setElements((prev) =>
//                       prev.map((item) =>
//                         item.id === el.id
//                           ? {
//                               ...item,
//                               x: node.x(),
//                               y: node.y(),
//                               width: node.width() * scaleX,
//                               height: node.height() * scaleY,
//                             }
//                           : item
//                       )
//                     );
//                   }}
//                 />
//               );
//             }

//             if (el.type === 'text') {
//               return (
//                 <Text
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   x={el.x}
//                   y={el.y}
//                   text={editingId === el.id ? textValue : el.text}
//                   fontSize={el.fontSize}
//                   fill={editingId === el.id ? 'red' : 'black'}
//                   draggable={el.draggable}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onDblClick={() => handleDblClick(el)}
//                   lineHeight={1.3}
//                   width={300}
//                 />
//               );
//             }

//             return null;
//           })}
//           <Transformer ref={trRef} />
//         </Layer>
//       </Stage>
//     </div>
//   );
// }













// 444444444444444444444444444444444444444444
// import React, { useEffect, useRef, useState } from 'react';
// import { Stage, Layer, Image as KonvaImage, Rect, Text, Transformer } from 'react-konva';
// import useImage from 'use-image';

// export default function PDFPage({ imageUrl, pageIndex , originalFilename}) {
//   const [background] = useImage(imageUrl, 'Anonymous');
//   const [elements, setElements] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [textValue, setTextValue] = useState('');
//   const trRef = useRef();
//   const stageRef = useRef();

//   // ✅ تحديث Transformer عند تغيير التحديد
//   useEffect(() => {
//     const selectedNode = elements.find((el) => el.id === selectedId)?.ref?.current;
//     if (trRef.current && selectedNode) {
//       trRef.current.nodes([selectedNode]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [selectedId, elements]);

//   // ✅ منع التمرير وتحرير النص مباشرة
// useEffect(() => {
//   const handleKeyDown = (e) => {
//     // ✅ حذف العنصر المحدد خارج وضع التحرير
//     if (!editingId) {
//       if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
//         setElements((prev) => prev.filter((el) => el.id !== selectedId));
//         setSelectedId(null);
//         if (trRef.current) {
//           trRef.current.nodes([]);
//           trRef.current.getLayer().batchDraw();
//         }
//       }
//       return;
//     }

//     // 🧠 إذا كنت في وضع التحرير:
//     e.preventDefault();

//     if (e.key === 'Enter' && e.ctrlKey) {
//       setElements((prev) =>
//         prev.map((el) =>
//           el.id === editingId ? { ...el, text: textValue } : el
//         )
//       );
//       setEditingId(null);
//       setTextValue('');
//       setSelectedId(null);
//       if (trRef.current) {
//         trRef.current.nodes([]);
//         trRef.current.getLayer().batchDraw();
//       }
//     } else if (e.key === 'Enter') {
//       setTextValue((prev) => prev + '\n');
//     } else if (e.key === 'Backspace') {
//       setTextValue((prev) => prev.slice(0, -1));
//     } else if (e.key.length === 1) {
//       setTextValue((prev) => prev + e.key);
//     } else if (e.key === 'Escape') {
//       setEditingId(null);
//       setTextValue('');
//       setSelectedId(null);
//       if (trRef.current) {
//         trRef.current.nodes([]);
//         trRef.current.getLayer().batchDraw();
//       }
//     }
//   };

//   window.addEventListener('keydown', handleKeyDown);
//   return () => window.removeEventListener('keydown', handleKeyDown);
// }, [editingId, selectedId, textValue]);


//   // ✅ إضافة مستطيل
//   const addRect = () => {
//     const id = `rect-${Date.now()}`;
//     const shapeRef = React.createRef();
//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'rect',
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 60,
//         fill: 'rgba(255, 0, 0, 0.3)',
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   // ✅ إضافة نص
//   const addText = () => {
//     const id = `text-${Date.now()}`;
//     const shapeRef = React.createRef();
//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'text',
//         text: 'انقر مرتين للتعديل',
//         x: 120,
//         y: 150,
//         fontSize: 20,
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };





// const handleExport = () => {
//   const uri = stageRef.current.toDataURL({ pixelRatio: 2 });

//   const baseName = originalFilename?.replace(/\.[^/.]+$/, '') || `pdf-page-${pageIndex}`;

//   const link = document.createElement('a');
//   link.download = `${baseName}-page-${pageIndex}.png`; // 👈 مثال: "resume-page-1.png"
//   link.href = uri;
//   link.click();
// };





//   // ✅ حذف العنصر المحدد
//   const deleteSelected = () => {
//     setElements(elements.filter((el) => el.id !== selectedId));
//     setSelectedId(null);
//     if (trRef.current) {
//       trRef.current.nodes([]);
//       trRef.current.getLayer().batchDraw();
//     }
//   };

//   // ✅ التعديل على النص عند الضغط مرتين
//   const handleDblClick = (element) => {
//     setEditingId(element.id);
//     setTextValue(element.text);
//   };

//   return (
//     <div>
//       <div className="flex gap-2 mb-2">
//         <button onClick={addText} className="bg-blue-500 text-white px-2 py-1 rounded">نص</button>
//         <button onClick={addRect} className="bg-green-500 text-white px-2 py-1 rounded">مستطيل</button>
//         <button onClick={deleteSelected} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ حذف</button>
//         <button onClick={handleExport} className="bg-purple-500 text-white px-2 py-1 rounded">
//   💾   تحميل الصفحه كصوره 
// </button>

//       </div>

// <Stage
//   ref={stageRef}
//   width={800}
//   height={1130}
//   onMouseDown={(e) => {
//     const clicked = e.target;
//     const isEmptyClick = clicked === e.target.getStage() || clicked.getClassName() === 'Layer';

//     if (isEmptyClick) {
//       setSelectedId(null);
//       if (trRef.current) {
//         trRef.current.nodes([]);
//         trRef.current.getLayer().batchDraw();
//       }
//     } else {
//       const clickedId = clicked.attrs.id;
//       setSelectedId(clickedId || null);
//     }
//   }}
// >

      
//         <Layer>
//           {background && <KonvaImage image={background} width={800} height={1130} />}
//           {elements.map((el) => {
//             if (el.type === 'rect') {
//               return (
//                 <Rect
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   {...el}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onTransformEnd={(e) => {
//                     const node = e.target;
//                     const scaleX = node.scaleX();
//                     const scaleY = node.scaleY();
//                     node.scaleX(1);
//                     node.scaleY(1);
//                     setElements((prev) =>
//                       prev.map((item) =>
//                         item.id === el.id
//                           ? {
//                               ...item,
//                               x: node.x(),
//                               y: node.y(),
//                               width: node.width() * scaleX,
//                               height: node.height() * scaleY,
//                             }
//                           : item
//                       )
//                     );
//                   }}
//                 />
//               );
//             }

//             if (el.type === 'text') {
//               return (
//                 <Text
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   x={el.x}
//                   y={el.y}
//                   text={editingId === el.id ? textValue : el.text}
//                   fontSize={el.fontSize}
//                   fill={editingId === el.id ? 'red' : 'black'}
//                   draggable={el.draggable}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onDblClick={() => handleDblClick(el)}
//                   lineHeight={1.3}
//                   width={300}
//                 />
//               );
//             }

//             return null;
//           })}
//           <Transformer ref={trRef} />
//         </Layer>
//       </Stage>
//     </div>
//   );
// }

// 4444444444444444444444444444

























// 55555555555555555555555555555555555555555555555555555555555555555555555555555555

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import { Stage, Layer, Image as KonvaImage, Rect, Text, Transformer } from 'react-konva';
// import useImage from 'use-image';

// const PDFPage = forwardRef(function PDFPage({ imageUrl, pageIndex, originalFilename, initialElements = [] }, ref) {
//   const [background] = useImage(imageUrl, 'Anonymous');
//   const [elements, setElements] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [textValue, setTextValue] = useState('');
//   // const [elements, setElements] = useState(initialElements);
//   const trRef = useRef();
//   const stageRef = useRef();


  
//   useEffect(() => {
//     const processedElements = initialElements.map((el) => ({
//       ...el,
//       ref: React.createRef(), // 👈 إنشاء ref جديد لكل عنصر
//     }));
//     setElements(processedElements);
//     console.log(initialElements)
//   }, [initialElements]);


//   // ✅ واجهة تسمح بإخراج العناصر عند الحاجة
//   useImperativeHandle(ref, () => ({
//     getElements: () => elements,
//   }));

//   useEffect(() => {
//     const selectedNode = elements.find((el) => el.id === selectedId)?.ref?.current;
//     if (trRef.current && selectedNode) {
//       trRef.current.nodes([selectedNode]);
//       trRef.current.getLayer().batchDraw();
//     }
    
//   }, [selectedId, elements]);
  

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!editingId) {
//         if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
//           setElements((prev) => prev.filter((el) => el.id !== selectedId));
//           setSelectedId(null);
//           if (trRef.current) {
//             trRef.current.nodes([]);
//             trRef.current.getLayer().batchDraw();
//           }
//         }
//         return;
//       }

//       e.preventDefault();

//       if (e.key === 'Enter' && e.ctrlKey) {
//         setElements((prev) =>
//           prev.map((el) =>
//             el.id === editingId ? { ...el, text: textValue } : el
//           )
//         );
//         setEditingId(null);
//         setTextValue('');
//         setSelectedId(null);
//         if (trRef.current) {
//           trRef.current.nodes([]);
//           trRef.current.getLayer().batchDraw();
//         }
//       } else if (e.key === 'Enter') {
//         setTextValue((prev) => prev + '\n');
//       } else if (e.key === 'Backspace') {
//         setTextValue((prev) => prev.slice(0, -1));
//       } else if (e.key.length === 1) {
//         setTextValue((prev) => prev + e.key);
//       } else if (e.key === 'Escape') {
//         setEditingId(null);
//         setTextValue('');
//         setSelectedId(null);
//         if (trRef.current) {
//           trRef.current.nodes([]);
//           trRef.current.getLayer().batchDraw();
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [editingId, selectedId, textValue]);

//   const addRect = () => {
//     const id = `rect-${Date.now()}`;
//     const shapeRef = React.createRef();
//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'rect',
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 60,
//         fill: 'rgba(255, 0, 0, 0.3)',
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   const addText = () => {
//     const id = `text-${Date.now()}`;
//     const shapeRef = React.createRef();
//     setElements([
//       ...elements,
//       {
//         id,
//         type: 'text',
//         text: 'انقر مرتين للتعديل',
//         x: 120,
//         y: 150,
//         fontSize: 20,
//         draggable: true,
//         ref: shapeRef,
//       },
//     ]);
//   };

//   const handleExport = () => {
//     const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
//     const baseName = originalFilename?.replace(/\.[^/.]+$/, '') || `pdf-page-${pageIndex}`;
//     const link = document.createElement('a');
//     link.download = `${baseName}-page-${pageIndex}.png`;
//     link.href = uri;
//     link.click();
//   };

//   const deleteSelected = () => {
//     setElements(elements.filter((el) => el.id !== selectedId));
//     setSelectedId(null);
//     if (trRef.current) {
//       trRef.current.nodes([]);
//       trRef.current.getLayer().batchDraw();
//     }
//   };

//   const handleDblClick = (element) => {
//     setEditingId(element.id);
//     setTextValue(element.text);
//   };

//   return (
//     <div>
//       <div className="flex gap-2 mb-2">
//         <button onClick={addText} className="bg-blue-500 text-white px-2 py-1 rounded">نص</button>
//         <button onClick={addRect} className="bg-green-500 text-white px-2 py-1 rounded">مستطيل</button>
//         <button onClick={deleteSelected} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ حذف</button>
//         <button onClick={handleExport} className="bg-purple-500 text-white px-2 py-1 rounded">
//           💾 تحميل الصفحه كصوره
//         </button>
//       </div>

//       <Stage
//         ref={stageRef}
//         width={800}
//         height={1130}
//         onMouseDown={(e) => {
//           const clicked = e.target;
//           const isEmptyClick = clicked === e.target.getStage() || clicked.getClassName() === 'Layer';

//           if (isEmptyClick) {
//             setSelectedId(null);
//             if (trRef.current) {
//               trRef.current.nodes([]);
//               trRef.current.getLayer().batchDraw();
//             }
//           } else {
//             const clickedId = clicked.attrs.id;
//             setSelectedId(clickedId || null);
//           }
//         }}
//       >
//         <Layer>
//           {background && <KonvaImage image={background} width={800} height={1130} />}
//           {elements.map((el) => {
//             if (el.type === 'rect') {
//               return (
//                 <Rect
//                   onDragEnd={(e) => {
//     const node = e.target;
//     const id = node.attrs.id;
//     setElements((prev) =>
//       prev.map((el) =>
//         el.id === id ? { ...el, x: node.x(), y: node.y() } : el
//       )
//     );
//   }}
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   {...el}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onTransformEnd={(e) => {
//                     const node = e.target;
//                     const scaleX = node.scaleX();
//                     const scaleY = node.scaleY();
//                     node.scaleX(1);
//                     node.scaleY(1);
//                     setElements((prev) =>
//                       prev.map((item) =>
//                         item.id === el.id
//                           ? {
//                               ...item,
//                               x: node.x(),
//                               y: node.y(),
//                               width: node.width() * scaleX,
//                               height: node.height() * scaleY,
//                             }
//                           : item
//                       )
//                     );
                    
//                   }}
//                 />
//               );
//             }

//             if (el.type === 'text') {
//               return (
//                 <Text
//                   key={el.id}
//                   id={el.id}
//                   ref={el.ref}
//                   x={el.x}
//                   y={el.y}
//                   text={editingId === el.id ? textValue : el.text}
//                   fontSize={el.fontSize}
//                   fill={editingId === el.id ? 'red' : 'black'}
//                   draggable={el.draggable}
//                   onClick={() => setSelectedId(el.id)}
//                   onTap={() => setSelectedId(el.id)}
//                   onDblClick={() => handleDblClick(el)}
//                   lineHeight={1.3}
//                   width={300}
//                     onDragEnd={(e) => {
//     const node = e.target;
//     const id = node.attrs.id;
//     setElements((prev) =>
//       prev.map((el) =>
//         el.id === id ? { ...el, x: node.x(), y: node.y() } : el
//       )
//     );
//   }}
//                 />
//               );
//             }

//             return null;
//           })}
//           <Transformer ref={trRef} />
//         </Layer>
//       </Stage>
//     </div>
//   );
// });

// export default PDFPage;
// 55555555555555555555555555555555555555555555555555555555555555555555555555555555555















import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Transformer } from 'react-konva';
import useImage from 'use-image';

const PDFPage = forwardRef(function PDFPage(props, ref) {
  const {
    imageUrl,
    pageIndex,
    originalFilename,
    initialElements = [],
    canReset,
    fileId,
    token,
  } = props;
  const [background] = useImage(imageUrl, 'Anonymous');
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [textValue, setTextValue] = useState('');
  // const [elements, setElements] = useState(initialElements);
  const trRef = useRef();
  const stageRef = useRef();



  
  useEffect(() => {
    const processedElements = initialElements.map((el) => ({
      ...el,
      ref: React.createRef(), // 👈 إنشاء ref جديد لكل عنصر
    }));
    setElements(processedElements);
    console.log(initialElements)
  }, [initialElements]);


  // ✅ واجهة تسمح بإخراج العناصر عند الحاجة
  useImperativeHandle(ref, () => ({
    getElements: () => elements,
  }));

  useEffect(() => {
    const selectedNode = elements.find((el) => el.id === selectedId)?.ref?.current;
    if (trRef.current && selectedNode) {
      trRef.current.nodes([selectedNode]);
      trRef.current.getLayer().batchDraw();
    }
    
  }, [selectedId, elements]);
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editingId) {
        if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
          setElements((prev) => prev.filter((el) => el.id !== selectedId));
          setSelectedId(null);
          if (trRef.current) {
            trRef.current.nodes([]);
            trRef.current.getLayer().batchDraw();
          }
        }
        return;
      }

      e.preventDefault();

      if (e.key === 'Enter' && e.ctrlKey) {
        setElements((prev) =>
          prev.map((el) =>
            el.id === editingId ? { ...el, text: textValue } : el
          )
        );
        setEditingId(null);
        setTextValue('');
        setSelectedId(null);
        if (trRef.current) {
          trRef.current.nodes([]);
          trRef.current.getLayer().batchDraw();
        }
      } else if (e.key === 'Enter') {
        setTextValue((prev) => prev + '\n');
      } else if (e.key === 'Backspace') {
        setTextValue((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTextValue((prev) => prev + e.key);
      } else if (e.key === 'Escape') {
        setEditingId(null);
        setTextValue('');
        setSelectedId(null);
        if (trRef.current) {
          trRef.current.nodes([]);
          trRef.current.getLayer().batchDraw();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingId, selectedId, textValue]);

  const addRect = () => {
    const id = `rect-${Date.now()}`;
    const shapeRef = React.createRef();
    setElements([
      ...elements,
      {
        id,
        type: 'rect',
        x: 100,
        y: 100,
        width: 100,
        height: 60,
        fill: 'rgba(255, 0, 0, 0.3)',
        draggable: true,
        ref: shapeRef,
      },
    ]);
  };

  const addText = () => {
    const id = `text-${Date.now()}`;
    const shapeRef = React.createRef();
    setElements([
      ...elements,
      {
        id,
        type: 'text',
        text: 'انقر مرتين للتعديل',
        x: 120,
        y: 150,
        fontSize: 20,
        draggable: true,
        ref: shapeRef,
      },
    ]);
  };

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const baseName = originalFilename?.replace(/\.[^/.]+$/, '') || `pdf-page-${pageIndex}`;
    const link = document.createElement('a');
    link.download = `${baseName}-page-${pageIndex}.png`;
    link.href = uri;
    link.click();
  };

  const deleteSelected = () => {
    setElements(elements.filter((el) => el.id !== selectedId));
    setSelectedId(null);
    if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
  };

  const handleDblClick = (element) => {
    setEditingId(element.id);
    setTextValue(element.text);
  };

  const handleResetPage = async () => {
  if (!canReset) return;

  try {
    const res = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${fileId}/annotations/${pageIndex}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setElements([]); // امسح العناصر من الواجهة
      // alert('✅ تمت إعادة الصفحة للوضع الأصلي');
    } else {
      const err = await res.json();
      alert('❌ فشل في إعادة الصفحة: ' + err.message);
    }
  } catch (err) {
    console.error('خطأ في حذف التعليقات:', err);
    alert('⚠️ خطأ في السيرفر');
  }
};


  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={addText} className="bg-blue-500 text-white px-2 py-1 rounded">نص</button>
        <button onClick={addRect} className="bg-green-500 text-white px-2 py-1 rounded">مستطيل</button>
        <button onClick={deleteSelected} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ حذف</button>
        <button onClick={handleExport} className="bg-purple-500 text-white px-2 py-1 rounded">
          💾 تحميل الصفحه كصوره
        </button>
        <button
  onClick={handleResetPage}
  disabled={!canReset}
  className={`px-2 py-1 rounded ${canReset ? 'bg-yellow-500 text-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
>
  ♻️ مسح كل التعديلات الموجوده في الصغحه
</button>
      </div>

      <Stage
        ref={stageRef}
        width={800}
        height={1130}
        onMouseDown={(e) => {
          const clicked = e.target;
          const isEmptyClick = clicked === e.target.getStage() || clicked.getClassName() === 'Layer';

          if (isEmptyClick) {
            setSelectedId(null);
            if (trRef.current) {
              trRef.current.nodes([]);
              trRef.current.getLayer().batchDraw();
            }
          } else {
            const clickedId = clicked.attrs.id;
            setSelectedId(clickedId || null);
          }
        }}
      >
        <Layer>
          {background && <KonvaImage image={background} width={800} height={1130} />}
          {elements.map((el) => {
            if (el.type === 'rect') {
              return (
                <Rect
                  onDragEnd={(e) => {
    const node = e.target;
    const id = node.attrs.id;
    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, x: node.x(), y: node.y() } : el
      )
    );
  }}
                  key={el.id}
                  id={el.id}
                  ref={el.ref}
                  {...el}
                  onClick={() => setSelectedId(el.id)}
                  onTap={() => setSelectedId(el.id)}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    setElements((prev) =>
                      prev.map((item) =>
                        item.id === el.id
                          ? {
                              ...item,
                              x: node.x(),
                              y: node.y(),
                              width: node.width() * scaleX,
                              height: node.height() * scaleY,
                            }
                          : item
                      )
                    );
                    
                  }}
                />
              );
            }

            if (el.type === 'text') {
              return (
                <Text
                  key={el.id}
                  id={el.id}
                  ref={el.ref}
                  x={el.x}
                  y={el.y}
                  text={editingId === el.id ? textValue : el.text}
                  fontSize={el.fontSize}
                  fill={editingId === el.id ? 'red' : 'black'}
                  draggable={el.draggable}
                  onClick={() => setSelectedId(el.id)}
                  onTap={() => setSelectedId(el.id)}
                  onDblClick={() => handleDblClick(el)}
                  lineHeight={1.3}
                  width={300}
                    onDragEnd={(e) => {
    const node = e.target;
    const id = node.attrs.id;
    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, x: node.x(), y: node.y() } : el
      )
    );
  }}
                />
              );
            }

            return null;
          })}
          <Transformer ref={trRef} />
        </Layer>
      </Stage>
    </div>
  );
});

export default PDFPage;