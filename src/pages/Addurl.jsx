import { FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown, IoIosLink, IoMdArrowDropup } from "react-icons/io";
import { TfiUpload } from "react-icons/tfi";

import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaDatabaseSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FiEdit3 } from "react-icons/fi";
import { BsFillFilePdfFill } from "react-icons/bs";
import { useState, useEffect } from "react";

import {  Droppable, Draggable } from 'react-beautiful-dnd';

function Addurl() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [formHeading, setformHeading] = useState("");
  const [formSubHeading, setformSubHeading] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [linksec, setlinksec] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [editmodule, seteditmodule] = useState("");
  const [editdisplay, seteditdisplay] = useState("");
  const [test, settest] = useState(true);

  const [selectedFile, setSelectedFile] = useState(""); // State to store selected file

  const [allTodos, setTodos] = useState([]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setShowForm(false);
  };

  const toggleEdit = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, todoIndex) =>
        todoIndex === index ? { ...todo, edit: !todo.edit } : todo
      )
    );
  };

  const handleform = () => {
    setShowForm(true); // Show the form when "Create Module" is clicked
    setDropdownVisible(false); // Close the dropdown when the form is shown
    setModuleName("");
    setDisplayName("");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = () => {
    setDropdownVisible(false);

    if (
      (!moduleName || moduleName.trim() === "") &&
      (!displayName || displayName.trim() === "") &&
      (!selectedFile || selectedFile.trim() === null)
    ) {
      return;
    }

    let newTodoItem = {
      title: moduleName,
      displayName: displayName,
      filename: selectedFile,
      // If you need to store the file itself, you can store it here, but for simplicity, we're only storing the filename.
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setDisplayName("");
    setModuleName("");
    setSelectedFile(null);
  };

  // Deleting todos

  const handleDeleteTodo = (index) => {
    const updatedTodos = allTodos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
  };

  // for storage using useeffect

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));

    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  // opening url


  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file.name);
    console.log(file);
    console.log(file.name);
  };

  useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile);
      handleSubmit();
    }
  }, [selectedFile, handleSubmit]);
  // edit

  const handleEdit = (ind) => {
    setCurrentEdit(ind);
    if (allTodos[ind].displayName !== "") {
      setformHeading("Edit URL");
      setformSubHeading("URL");
      setlinksec(true);
    }
    settest(false);
  };

  const handleUpdateToDo = (ind) => {
    // Update the title of the todo at index 'ind' with the new value
    const updatedTodos = allTodos.map((todo, index) => {
      if (index === ind) {
        if (editmodule.trim() !== "") {
          if (todo.filename !== null) {
            return { ...todo, filename: editmodule };
          } else {
            return {
              ...todo,
              title: editmodule,
              displayName:
                editdisplay.trim() !== "" ? editdisplay : todo.displayName,
            };
          }
        } else {
          return todo;
        }
      } else {
        return todo;
      }
    });

    // Update the state with the new todos
    setTodos(updatedTodos);

    // Clear the edit inputs
    seteditmodule("");
    seteditdisplay("");

    // Update local storage with the new todos
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
  };
  // react dnd func

  return (
    <>
        {test ? (
          <>
            {showForm ? (
              <div className="absolute flex items-center justify-center w-screen h-screen bg-gray-200">
                <div className="shadow-lg bg-white shadow-gray-500 w-1/3  rounded-md p-6">
                  <form>
                    <div className="flex justify-between m-2">
                      <label className="font-black text-lg" id="formHeading">
                        {formHeading}
                      </label>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setShowForm(false);
                          setlinksec(false);
                        }}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center mt-8 m-2">
                      <label className="m-2 font-semibold" id="formSubheading">
                        {formSubHeading}
                      </label>
                      <div className="border-2 border-gray-200 m-2 rounded-md">
                        <input
                          type="text"
                          name="moduleName"
                          id="moduleName"
                          className="p-2 w-full outline-none"
                          value={moduleName}
                          onChange={(e) => setModuleName(e.target.value)}
                        />
                      </div>
                    </div>
                    {linksec && (
                      <div className="flex flex-col justify-center mt-8 m-2">
                        <div className="m-2 mt-4 font-semibold">
                          Display name
                        </div>
                        <div className="border-2 border-gray-200 m-2 mb-4 rounded-md">
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            className="p-2 w-full outline-none"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="border-2 border-gray-200 mr-5 rounded-md text-gray-500 p-2 cursor-pointer"
                        onClick={() => {
                          setShowForm(false);
                          setlinksec(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-save rounded-md p-2 cursor-pointer"
                        onClick={() => {
                          setShowForm(false);
                          setlinksec(false);
                          handleSubmit();
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* navbar section */}

                <div className="flex justify-around p-16" id="home">
                  <div className="flex justify-center font-bold text-2xl">
                    Course Builder
                  </div>
                  <div className="flex flex-col  w-64 items-end ">
                    <button
                      className="bg-af273e w-24 rounded-md p-1 text-white flex justify-center items-center"
                      onClick={toggleDropdown}
                    >
                      <FaPlus /> &nbsp; <span className="text-lg">Add</span>{" "}
                      &nbsp;
                      {dropdownVisible ? (
                        <IoMdArrowDropup />
                      ) : (
                        <IoMdArrowDropdown />
                      )}
                    </button>
                    {dropdownVisible && (
                      <div className="absolute w-64 mt-10 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                        <div
                          className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                          id="createModule"
                          onClick={() => {
                            setformHeading("Create new Module");
                            setformSubHeading("Module name");
                            handleform();
                          }}
                        >
                          <LiaDatabaseSolid /> &nbsp;&nbsp;Create module
                        </div>
                        <div
                          className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                          id="createLink"
                          onClick={() => {
                            setformHeading("Add a new Link");
                            setformSubHeading("URL");
                            setlinksec(true);
                            handleform();
                          }}
                        >
                          <IoIosLink />
                          &nbsp;&nbsp;Add a link
                        </div>
                        <div className="flex items-center pl-3 p-2 cursor-pointer">
                          <label
                            htmlFor="fileInput"
                            className="flex w-full cursor-pointer items-center"
                          >
                            <TfiUpload />
                            &nbsp;&nbsp;Upload File
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => handleFileChange(event)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* empty sec */}
                {allTodos.length === 0 && (
                  <div
                    className="mt-14 flex flex-col justify-center items-center "
                    id="empty"
                  >
                    <div className="p-4">
                      <img src="Resources.png" alt="" className=""></img>
                    </div>
                    <div className="p-3 text-lg font-bold">
                      {/* {selectedFile ? selectedFile : "Nothing added here yet"} */}
                      {selectedFile ? selectedFile : "Nothing added here yet"}
                    </div>
                    <div className="">
                      Click on the [+] Add button to add items to this course
                    </div>
                  </div>
                )}
                {/* todos container */}
                {allTodos.length > 0 && (
                  // <DragDropContext onDragEnd={()=>()}>
                  //   <div
                  //     className="flex flex-col items-center justify-center"
                  //     id="container"
                  //   >
                  //     {allTodos.map((item, index) => {
                  //       if (item.filename !== null && item.filename !== "") {
                  //         // Render PDF section
                  //         return (
                  //           <>
                  //             <Draggable
                  //               draggableId="pdf"
                  //               index={index}
                  //             >
                  //               {(provided) => (
                  //                 <div
                  //                   className="flex justify-between w-2/3 border-2 border-gray-200  rounded-md mb-10 cursor-pointer"
                  //                   {...provided.draggableProps}
                  //                   {...provided.dragHandleProps}
                  //                   ref={provided.innerRef}
                  //                 >
                  //                   <div className="flex items-center p-1">
                  //                     <div className="flex justify-center items-center  text-2xl  text-red-400 rounded-full">
                  //                       <BsFillFilePdfFill />
                  //                     </div>
                  //                     <div className="flex flex-col ml-2 p-1">
                  //                       <div className="font-semibold">
                  //                         {item.filename}
                  //                       </div>
                  //                       <div className="text-sm text-gray-500">
                  //                         PDF
                  //                       </div>
                  //                     </div>
                  //                   </div>
                  //                   <div
                  //                     className="flex items-center justify-center text-xl cursor-pointer"
                  //                     onClick={() => toggleEdit(index)}
                  //                   >
                  //                     <RxDotsVertical />
                  //                     {item.edit && (
                  //                       <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                  //                         <div
                  //                           className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                  //                           onClick={() => {
                  //                             setformHeading("Edit");
                  //                             setformSubHeading("Rename");
                  //                             handleEdit(index);
                  //                           }}
                  //                         >
                  //                           <FiEdit3 /> &nbsp;&nbsp;Rename
                  //                         </div>
                  //                         <div
                  //                           className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                  //                           onClick={() =>
                  //                             handleDownload(item.filename)
                  //                           }
                  //                         >
                  //                           <TfiDownload /> &nbsp;&nbsp;Download
                  //                         </div>
                  //                         <div
                  //                           className="flex items-center text-red-500 hover:bg-gray-100  pl-3 p-2 cursor-pointer "
                  //                           id="Delete"
                  //                           onClick={() =>
                  //                             handleDeleteTodo(index)
                  //                           }
                  //                         >
                  //                           <RiDeleteBin6Line />
                  //                           &nbsp;&nbsp;Delete
                  //                         </div>
                  //                       </div>
                  //                     )}
                  //                   </div>
                  //                 </div>
                  //               )}
                  //             </Draggable>
                  //           </>
                  //         );
                  //       } else if (
                  //         item.displayName === "" &&
                  //         item.filename === null
                  //       ) {
                  //         // Render Module section
                  //         return (
                  //           <>
                  //             <Droppable droppableId="modulelist">
                  //               {(provided) => (
                  //                 <div
                  //                   className="w-2/3"
                  //                   key={index}
                  //                   ref={provided.innerRef}
                  //                   {...provided.droppableProps}
                  //                 >
                  //                   <div
                  //                     className="flex justify-between w-full border-2 border-gray-200  rounded-md mb-10 cursor-pointer"
                  //                     id="ModuleContainer"
                  //                     key={index}
                  //                   >
                  //                     <div
                  //                       className="flex items-center p-1"
                  //                       id="ModuleBox"
                  //                     >
                  //                       <div className="flex justify-center items-center border-2 border-gray-300  w-5 h-5  rounded-full">
                  //                         <IoMdArrowDropdown />
                  //                       </div>
                  //                       <div className="flex flex-col ml-2 p-1">
                  //                         <div className="font-semibold">
                  //                           {item.title}
                  //                         </div>
                  //                         <div className="text-sm text-gray-500">
                  //                           Add items to this module
                  //                         </div>
                  //                       </div>
                  //                     </div>
                  //                     <div
                  //                       className="flex flex-col justify-center items-center text-xl cursor-pointer"
                  //                       onClick={() => toggleEdit(index)}
                  //                     >
                  //                       <RxDotsVertical />

                  //                       {item.edit && (
                  //                         <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                  //                           <div
                  //                             className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                  //                             onClick={() => {
                  //                               setformHeading("Edit");
                  //                               setformSubHeading("Rename");
                  //                               allTodos[index].edit = false;
                  //                               handleEdit(index);
                  //                             }}
                  //                           >
                  //                             <FiEdit3 /> &nbsp;&nbsp;Edit
                  //                           </div>
                  //                           <div
                  //                             className="flex items-center text-red-500 hover:bg-gray-100  pl-3 p-2 cursor-pointer "
                  //                             id="Delete"
                  //                             onClick={() => {
                  //                               allTodos[index].edit = false;
                  //                               handleDeleteTodo(index);
                  //                             }}
                  //                           >
                  //                             <RiDeleteBin6Line />
                  //                             &nbsp;&nbsp;Delete
                  //                           </div>
                  //                         </div>
                  //                       )}
                  //                     </div>
                  //                   </div>
                  //                   {provided.placeholder}
                  //                 </div>
                  //               )}
                  //             </Droppable>
                  //           </>
                  //         );
                  //       } else {
                  //         // Render Link section
                  //         return (
                  //           <>
                  //             <Draggable
                  //               draggableId="link"
                  //               index={index}
                  //             >
                  //               {(provided) => (
                  //                 <div
                  //                   className="flex justify-between w-2/3 border-2 border-gray-200  rounded-md mb-10 cursor-pointer"
                  //                   {...provided.draggableProps}
                  //                   {...provided.dragHandleProps}
                  //                   ref={provided.innerRef}
                  //                 >
                  //                   <div
                  //                     className="flex items-center p-1 "
                  //                     onClick={() => handleClick(item.title)}
                  //                   >
                  //                     <div className="flex justify-center items-center border-2  p-1 bg-blue-100 text-lg text-blue-400 rounded-md">
                  //                       <IoIosLink />
                  //                     </div>
                  //                     <div className="flex flex-col ml-2 p-1">
                  //                       <div className="font-semibold">
                  //                         {item.displayName}
                  //                       </div>
                  //                       <div className="text-sm text-gray-500">
                  //                         Link
                  //                       </div>
                  //                     </div>
                  //                   </div>
                  //                   <div
                  //                     className="flex items-center justify-center text-xl cursor-pointer"
                  //                     onClick={() => toggleEdit(index)}
                  //                   >
                  //                     <RxDotsVertical />
                  //                     {item.edit && (
                  //                       <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                  //                         <div
                  //                           className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                  //                           onClick={() => {
                  //                             handleEdit(index);
                  //                             allTodos[index].edit = false;
                  //                           }}
                  //                         >
                  //                           <FiEdit3 /> &nbsp;&nbsp;Edit
                  //                         </div>
                  //                         <div
                  //                           className="flex items-center text-red-500 hover:bg-gray-100  pl-3 p-2 cursor-pointer "
                  //                           id="Delete"
                  //                           onClick={() =>
                  //                             handleDeleteTodo(index)
                  //                           }
                  //                         >
                  //                           <RiDeleteBin6Line />
                  //                           &nbsp;&nbsp;Delete
                  //                         </div>
                  //                       </div>
                  //                     )}
                  //                   </div>
                  //                 </div>
                  //               )}
                  //             </Draggable>
                  //           </>
                  //         );
                  //       }
                  //     })}
                  //   </div>
                  // </DragDropContext>

                  <div
                    className="flex flex-col items-center justify-center"
                    id="container"
                  >
                    {allTodos.map((item, index) => (
                      <div key={`item-${index}`}>
                        {item.title && (
                          <Droppable
                            droppableId={`module-${index}`}
                            key={`module-${index}`}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                className="flex flex-col items-center justify-center"
                                id="module-container"
                                {...provided.droppableProps}
                              >
                                <Draggable
                                  key={`item-${index}`}
                                  draggableId={`item-${index}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="flex justify-between w-2/3 border-2 border-gray-200 rounded-md mb-10 cursor-pointer"
                                    >
                                      <div className="flex items-center p-1">
                                        <IoMdArrowDropdown />
                                        <div className="flex flex-col ml-2 p-1">
                                          <div className="font-semibold">
                                            {item.title}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            Add items to this module
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="flex items-center justify-center text-xl cursor-pointer"
                                        onClick={() => toggleEdit(index)}
                                      >
                                        <FiEdit3 />
                                        {item.edit && (
                                          <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1 shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                                            <div
                                              className="flex items-center hover:bg-gray-100 hover:text-black pl-3 p-2 cursor-pointer"
                                              onClick={() => handleEdit(index)}
                                            >
                                              <FiEdit3 />
                                              &nbsp;&nbsp;Edit
                                            </div>
                                            <div
                                              className="flex items-center text-red-500 hover:bg-gray-100 pl-3 p-2 cursor-pointer"
                                              id="Delete"
                                              onClick={() =>
                                                handleDeleteTodo(index)
                                              }
                                            >
                                              <RiDeleteBin6Line />
                                              &nbsp;&nbsp;Delete
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}
                        {item.displayName && (
                          <Draggable
                            key={`item-${index}`}
                            draggableId={`item-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex justify-between w-2/3 border-2 border-gray-200 rounded-md mb-10 cursor-pointer"
                              >
                                <div className="flex items-center p-1">
                                  <IoIosLink />
                                  <div className="flex flex-col ml-2 p-1">
                                    <div className="font-semibold">
                                      {item.displayName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Link
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="flex items-center justify-center text-xl cursor-pointer"
                                  onClick={() => toggleEdit(index)}
                                >
                                  <FiEdit3 />
                                  {item.edit && (
                                    <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1 shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                                      <div
                                        className="flex items-center hover:bg-gray-100 hover:text-black pl-3 p-2 cursor-pointer"
                                        onClick={() => handleEdit(index)}
                                      >
                                        <FiEdit3 />
                                        &nbsp;&nbsp;Edit
                                      </div>
                                      <div
                                        className="flex items-center text-red-500 hover:bg-gray-100 pl-3 p-2 cursor-pointer"
                                        id="Delete"
                                        onClick={() => handleDeleteTodo(index)}
                                      >
                                        <RiDeleteBin6Line />
                                        &nbsp;&nbsp;Delete
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )}
                        {item.filename && (
                          <Draggable
                            key={`item-${index}`}
                            draggableId={`item-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex justify-between w-2/3 border-2 border-gray-200 rounded-md mb-10 cursor-pointer"
                              >
                                <div className="flex items-center p-1">
                                  <BsFillFilePdfFill />
                                  <div className="flex flex-col ml-2 p-1">
                                    <div className="font-semibold">
                                      {item.filename}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      PDF
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="flex items-center justify-center text-xl cursor-pointer"
                                  onClick={() => toggleEdit(index)}
                                >
                                  <FiEdit3 />
                                  {item.edit && (
                                    <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1 shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                                      <div
                                        className="flex items-center hover:bg-gray-100 hover:text-black pl-3 p-2 cursor-pointer"
                                        onClick={() => handleEdit(index)}
                                      >
                                        <FiEdit3 />
                                        &nbsp;&nbsp;Edit
                                      </div>
                                      <div
                                        className="flex items-center text-red-500 hover:bg-gray-100 pl-3 p-2 cursor-pointer"
                                        id="Delete"
                                        onClick={() => handleDeleteTodo(index)}
                                      >
                                        <RiDeleteBin6Line />
                                        &nbsp;&nbsp;Delete
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* form to edit alltodos */}

            {allTodos.length > 0 && (
              <>
                {allTodos.map((item, index) => {
                  if (currentEdit === index) {
                    return (
                      <>
                        <div
                          className="absolute flex items-center justify-center w-full h-full bg-gray-200"
                          key={index}
                        >
                          <div className="shadow-lg bg-white shadow-gray-500 w-1/3  rounded-md p-6">
                            <form>
                              <div className="flex justify-between m-2">
                                <label
                                  className="font-black text-lg"
                                  id="formHeading"
                                >
                                  {formHeading}
                                </label>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    settest(true);
                                    setlinksec(false);
                                  }}
                                >
                                  <RxCross2 />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center mt-8 m-2">
                                <label
                                  className="m-2 font-semibold"
                                  id="formSubheading"
                                >
                                  {formSubHeading}
                                </label>
                                <div className="border-2 border-gray-200 m-2 rounded-md">
                                  <input
                                    type="text"
                                    name="moduleName"
                                    id="moduleName"
                                    className="p-2 w-full outline-none"
                                    onChange={(e) =>
                                      seteditmodule(e.target.value)
                                    }
                                    value={editmodule}
                                  />
                                </div>
                              </div>
                              {linksec && (
                                <div className="flex flex-col justify-center mt-8 m-2">
                                  <div className="m-2 mt-4 font-semibold">
                                    Display name
                                  </div>
                                  <div className="border-2 border-gray-200 m-2 mb-4 rounded-md">
                                    <input
                                      type="text"
                                      name="displayName"
                                      id="displayName"
                                      className="p-2 w-full outline-none"
                                      // value={displayName}
                                      value={editdisplay}
                                      onChange={(e) =>
                                        seteditdisplay(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  className="border-2 border-gray-200 mr-5 rounded-md text-gray-500 p-2 cursor-pointer"
                                  onClick={() => {
                                    setlinksec(false);
                                    settest(true);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="bg-save rounded-md p-2 cursor-pointer"
                                  onClick={() => {
                                    setlinksec(false);
                                    settest(true);
                                    allTodos[index].edit = false;
                                    handleUpdateToDo(index);
                                  }}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </>
            )}
          </>
        )}
    </>
  );
}

export default Addurl;
