import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './ItemMaster.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function ItemMaster() {
  const [itemMasters, setItemMasters] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newItemMasterName, setNewItemMasterName] = useState('');
  const [newNoofItemsinBox, setNewNoofItemsinBox] = useState('');
  const [newItemWeight, setNewItemWeight] = useState('');
  const [newItemRRPrice, setNewItemRRPrice] = useState('');
  const [currentItemMaster, setCurrentItemMaster] = useState(null);

  useEffect(() => {
    fetchItemMasters();
  }, []);

  const fetchItemMasters = async () => {
    const { data: itemMasters, error } = await supabase
      .from('item_master')
      .select('*')
      .eq('activestatus', 'Y'); // Filter active credit terms

    if (error) console.error('Error fetching credit terms:', error.message);
    else setItemMasters(itemMasters);
  };

  const handleAddItemMaster = async () => {
    const newItemMaster = {
      itemmastername: newItemMasterName,
      noofitemsinbox: newNoofItemsinBox,
      itemweight: newItemWeight,
      rrprice: newItemRRPrice,
      activestatus: 'Y',
      createdby: 'Admin', // Replace with actual user
      updatedby: 'Admin',
      created: new Date().toISOString(),
      lastupdatetime: new Date().toISOString(),
    };
    const { error } = await supabase
      .from('item_master')
      .insert([newItemMaster]);

    if (error) console.error('Error adding credit term:', error.message);
    else {
      setNewItemMasterName('');
      setNewNoofItemsinBox('');
      setNewItemWeight('');
      setNewItemRRPrice('');
      setShowAddPopup(false);
      fetchItemMasters();
    }
  };

  const handleEditItemMaster = async () => {
    if (currentItemMaster) {
      const { error } = await supabase
        .from('item_master')
        .update({ itemname: newItemMasterName, noofitemsinbox: newNoofItemsinBox, itemweight: newItemWeight, rrprice: newItemRRPrice, lastupdatetime: new Date().toISOString() })
        .eq('itemid', currentItemMaster.itemid);

      if (error) console.error('Error editing credit term:', error.message);
      else {
        setNewItemMasterName('');
        setNewNoofItemsinBox('');
        setNewItemWeight('');
        setNewItemRRPrice('');
        setShowAddPopup(false);
        fetchItemMasters();
      }
    }
  };

  const handleDeleteItemMaster = async (itemid) => {
    const { error } = await supabase
      .from('item_master')
      .update({ activestatus: 'N' })
      .eq('itemid', itemid);

    if (error) console.error('Error deleting credit term:', error.message);
    else fetchItemMasters();
  };

  return (
    <main id='main' className='main'>
      <h2><center>Item Master</center></h2>
      <div className="credit-term-table">
        <table>
          <thead>
            <tr>
              <th><center>Sl No</center></th>
              <th><center>Item Name</center></th>
              <th><center>Item Nos.</center></th>
              <th><center>Item Wt.</center></th>
              <th><center>RRP</center></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemMasters.map((itemMaster, index) => (
              <tr key={itemMaster.itemid}>
                <td><center>{index + 1}</center></td>
                <td><center>{itemMaster.itemname.trim()}</center></td>
                <td><center>{itemMaster.noofitemsinbox}</center></td>
                <td><center>{itemMaster.itemweight}</center></td>
                <td><center>{itemMaster.rrprice}</center></td>
                <td className="actions">
                  <button 
                    onClick={() => {
                      setCurrentItemMaster(itemMaster);
                      setNewItemMasterName(itemMaster.itemname.trim());
                      setNewNoofItemsinBox(itemMaster.noofitemsinbox);
                      setNewItemWeight(itemMaster.itemweight);
                      setNewItemRRPrice(itemMaster.rrprice);
                      setShowEditPopup(true);
                    }} 
                    className="action-button edit-button"
                  >
                    <FaEdit className="icon" />
                  </button>
                  <button 
                    onClick={() => handleDeleteItemMaster(itemMaster.itemid)} 
                    className="action-button delete-button"
                  >
                    <FaTrash className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-button-container">
        <button onClick={() => setShowAddPopup(true)}>Add New Item Master</button>
      </div>

      {/* Add Credit Term Popup */}
      {showAddPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h5>Add New Item Master</h5>
            <input
              type="text"
              placeholder="Item Master Name"
              value={newItemMasterName}
              onChange={(e) => setNewItemMasterName(e.target.value)}
            />
            <input
              type="number"
              placeholder="No of items in box"
              value={newNoofItemsinBox}
              onChange={(e) => setNewNoofItemsinBox(e.target.value)}
            />
            <input
              type="number"
              placeholder="ItemWeight"
              value={newItemWeight}
              onChange={(e) => setNewItemWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="RRP"
              value={newItemRRPrice}
              onChange={(e) => setNewItemRRPrice(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={handleAddItemMaster}>Submit</button>
              <button onClick={() => setShowAddPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Credit Term Popup */}
      {showEditPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h5>Edit Credit Item Term</h5>
            <input
              type="text"
              placeholder="Credit Term Name"
              value={newItemMasterName}
              onChange={(e) => setNewItemMasterName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Noofitemsinbox"
              value={newNoofItemsinBox}
              onChange={(e) => setNewNoofItemsinBox(e.target.value)}
            />
            <input
              type="number"
              placeholder="ItemWeight"
              value={newItemWeight}
              onChange={(e) => setNewItemWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="RRP"
              value={newItemRRPrice}
              onChange={(e) => setNewItemRRPrice(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={handleEditItemMaster}>Submit</button>
              <button onClick={() => setShowEditPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ItemMaster;
