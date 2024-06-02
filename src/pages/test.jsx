import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Inside your component
<DragDropContext onDragEnd={onDragEnd}>
  <div className="flex flex-col items-center justify-center" id="container">
    <Droppable droppableId="todos">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {allTodos.map((item, index) => {
            if (item.filename !== null && item.filename !== "") {
              // Render PDF section
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between w-2/3 border-2 border-gray-200 rounded-md mb-10 cursor-pointer"
                    >
                      <div className="flex items-center p-1">
                        <div className="flex justify-center items-center  text-2xl  text-red-400 rounded-full">
                          <BsFillFilePdfFill />
                        </div>
                        <div className="flex flex-col ml-2 p-1">
                          <div className="font-semibold">{item.filename}</div>
                          <div className="text-sm text-gray-500">PDF</div>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-center text-xl cursor-pointer"
                        onClick={() => toggleEdit(index)}
                      >
                        <RxDotsVertical />
                        {item.edit && (
                          <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                            <div
                              className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                              onClick={() => {
                                setformHeading("Edit");
                                setformSubHeading("Rename");
                                handleEdit(index);
                              }}
                            >
                              <FiEdit3 /> &nbsp;&nbsp;Rename
                            </div>
                            <div
                              className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                              onClick={() => handleDownload(item.filename)}
                            >
                              <TfiDownload /> &nbsp;&nbsp;Download
                            </div>
                            <div
                              className="flex items-center text-red-500 hover:bg-gray-100  pl-3 p-2 cursor-pointer "
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
              );
            } else if (item.displayName === "" && item.filename === null) {
              // Render Module section
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-2/3 flex justify-between border-2 border-gray-200 rounded-md mb-10 cursor-pointer"
                    >
                      <div className="flex items-center p-1" id="ModuleBox">
                        <div className="flex justify-center items-center border-2 border-gray-300  w-5 h-5  rounded-full">
                          <IoMdArrowDropdown />
                        </div>
                        <div className="flex flex-col ml-2 p-1">
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-sm text-gray-500">
                            Add items to this module
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex flex-col justify-center items-center text-xl cursor-pointer"
                        onClick={() => toggleEdit(index)}
                      >
                        <RxDotsVertical />

                        {item.edit && (
                          <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                            <div
                              className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                              onClick={() => {
                                setformHeading("Edit");
                                setformSubHeading("Rename");
                                allTodos[index].edit = false;
                                handleEdit(index);
                              }}
                            >
                              <FiEdit3 /> &nbsp;&nbsp;Edit
                            </div>
                            <div
                              className="flex items-center text-red-500 hover:bg-gray-100  pl-3 p-2 cursor-pointer "
                              id="Delete"
                              onClick={() => {
                                allTodos[index].edit = false;
                                handleDeleteTodo(index);
                              }}
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
              );
            } else {
              // Render Link section
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between w-2/3 border-2 border-gray-200 rounded-md mb-10 cursor-pointer"
                    >
                      <div
                        className="flex items-center p-1 "
                        onClick={() => handleClick(item.title)}
                      >
                        <div className="flex justify-center items-center border-2  p-1 bg-blue-100 text-lg text-blue-400 rounded-md">
                          <IoIosLink />
                        </div>
                        <div className="flex flex-col ml-2 p-1">
                          <div className="font-semibold">
                            {item.displayName}
                          </div>
                          <div className="text-sm text-gray-500">Link</div>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-center text-xl cursor-pointer"
                        onClick={() => toggleEdit(index)}
                      >
                        <RxDotsVertical />
                        {item.edit && (
                          <div className="absolute w-52 mt-40 mr-44 flex flex-col gap-1  shadow-lg shadow-gray-500 text-sm text-gray-500 pt-2 pb-2 rounded-md bg-white">
                            <div
                              className="flex items-center hover:bg-gray-100 hover:text-black  pl-3 p-2 cursor-pointer "
                              onClick={() => {
                                handleEdit(index);
                                allTodos[index].edit = false;
                              }}
                            >
                              <FiEdit3 /> &nbsp;&nbsp;Edit
                            </div>
                            <div
                              className="flex items-center text-red-500 hover:bg-gray-100  pl-3 p-2 cursor-pointer "
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
              );
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
</DragDropContext>;
