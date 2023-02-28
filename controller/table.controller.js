import { TableModel } from '../models/table.models.js';

// add a new Table
export async function addTable(req, res, next) {
  try {
    
    const { name, persons, time, date } = req.body;
    // if(!name || !persons || !time || !date) return res.status(404).json({ massage: 'Please fill all fields!' });
    
    if(name.length < 3) return res.status(404).json({ massage: 'Name should be atleast 3 characters long!' });
    
    if(name.length > 20) return res.status(404).json({ massage: 'Name should be less than 20 characters long!' });
    
    if(!name.match(/^[a-zA-Z ]*$/)) return res.status(404).json({ massage: 'Name should contain only alphabets!' });
    
    if(persons < 1 || persons > 10) return res.status(404).json({ massage: 'Persons must be between 1 and 10!' });
    
    if(persons.length > 2) return res.status(404).json({ massage: 'Persons should be less than 2 characters long!' });
    
    if(!time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) return res.status(404).json({ massage: 'Please enter a valid time!' });
    
    if(date < new Date().toISOString().split('T')[0]) return res.status(404).json({ massage: 'Please enter a valid date!' });
    
    
    if(date.length > 10) return res.status(404).json({ massage: 'Date should be less than 10 characters long!' });
    
    if(date.length < 10) return res.status(404).json({ massage: 'Date should be atleast 10 characters long!' });
    
    if(time.length > 5) return res.status(404).json({ massage: 'Time should be less than 5 characters long!' });
    
    if(time.length < 5) return res.status(404).json({ massage: 'Time should be atleast 5 characters long!' });
    
    
    const table = new TableModel({ name, persons, time, date });
    if(!table) return res.status(404).json({ massage: 'Table not added!' });
    await table.save();
    res.status(200).json({ message: 'Table booked successfully!'});
  } catch (e) {
    next(e);
  }
}

// get all Tables
export async function getTables(req, res, next) {
  try {
    const result = await TableModel.find();
    if(result.length === 0) return res.status(404).json({ massage: 'No tables found!' });   
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// get Table by ID
export async function getTable(req, res, next) {
  try {
    const { id } = req.params;
    if(!id) return res.status(404).json({ massage: 'Table not found!' });
    
    const table = await TableModel.findById(id);
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
}

// update Table
export async function updateTable(req, res, next) {
  try {
    const { id } = req.params;
    if(!id) return res.status(404).json({ massage: 'Table not found!' });
    
    const { name, persons, time, date } = req.body;
    if(!name || !persons || !time || !date) return res.status(404).json({ massage: 'Please fill all fields!' });
    if(persons < 1 || persons > 10) return res.status(404).json({ massage: 'Persons must be between 1 and 10!' });
    if(!time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) return res.status(404).json({ massage: 'Please enter a valid time!' });
    if(date < new Date().toISOString().split('T')[0]) return res.status(404).json({ massage: 'Please enter a valid date!' });
    if(!name.match(/^[a-zA-Z ]*$/)) return res.status(404).json({ massage: 'Name should contain only alphabets!' });
    if(name.length < 3) return res.status(404).json({ massage: 'Name should be atleast 3 characters long!' });
    if(name.length > 20) return res.status(404).json({ massage: 'Name should be less than 20 characters long!' });
    if(date.length > 10) return res.status(404).json({ massage: 'Date should be less than 10 characters long!' });
    if(date.length < 10) return res.status(404).json({ massage: 'Date should be atleast 10 characters long!' });
    if(time.length > 5) return res.status(404).json({ massage: 'Time should be less than 5 characters long!' });
    if(time.length < 5) return res.status(404).json({ massage: 'Time should be atleast 5 characters long!' });
    if(persons.length > 2) return res.status(404).json({ massage: 'Persons should be less than 2 characters long!' });


    const table = await TableModel.findByIdAndUpdate( id , { name, persons, time, date }, { new: true });
    
    res.status(200).json({ message: 'Table updated successfully!'});
    
  } catch (e) {
    next(e);
  }
}

// delete Table
export async function deleteTable(req, res, next) {
  try {
    const table = await TableModel.findByIdAndDelete(req.params.id);
    if(!table) return res.status(404).json({ massage: 'Table not found!' });
    res.status(200).json({ message: 'Table deleted successfully!'});
  } catch (e) {
    next(e);
  }
}


