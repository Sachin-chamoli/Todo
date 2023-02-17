import React, { useState, useEffect } from 'react'
import todo from "./image/Logo.png";

const getLocalItmes = () => {
  let list = localStorage.getItem('lists');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

const Todo = () => {

  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert('plzz fill data');
    } 
    else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem, index) => {
          if (index === isEditItem) {
            return inputData
          }
          return elem;
        })
      )
      setToggleSubmit(true);

      setInputData('');

      setIsEditItem(null);
    }
     else {
      setItems([...items, inputData]);
      setInputData('')
    }
  }


  // delete the items
  const deleteItem = (id) => {
    const updateditems = items.filter((elem, index) => {
      return index !== id;
    });

    setItems(updateditems);
  }

  const editItem = (id) => {
    let newEditItem = items.find((elem,index) => {
      return index === id
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem);

    setIsEditItem(id);

  }


  // remove all 
  const removeAll = () => {
    setItems([]);
  }

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          <div className="addItems">
            <input type="text" placeholder="✍ Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {
              toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
            }

          </div>

          <div className="showItems">

            {
              items.map((elem, index) => {
                return (
                  <div className="eachItem" key={index}>
                    <h3>{elem}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(index)}></i>
                      <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(index)}></i>
                    </div>
                  </div>
                )
              })

            }

          </div>

          {/* clear all button  */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
