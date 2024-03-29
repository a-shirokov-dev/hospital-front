import { useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { useState } from 'react';
import EditVisit from './modalEdit';
import DeleteVisit from './modalDelete';
import './contentBlock.scss';

const ContentBlock = ({ allVisits, setAllVisits, doctors }) => {
  const[openEdit, setOpenEdit] = useState(false);
  const[openDelete, setOpenDelete] = useState(false);
  const[unuqieID, setUniqueID] = useState(null);
  const[editedVisit, setEditedVisit] = useState({});

  const tableHeaders = [
    'Patient',
    'Doctor',
    'Date',
    'Problem',
    'Button column'
  ]
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/allVisits', {
      headers : {
        token: `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(res => {
      setAllVisits(res.data.data);
    });
  }, [setAllVisits]);

  const handleEditVisit = (index) => {
    setEditedVisit(allVisits[index]);
    setOpenEdit(true);
  }

  const handleDeleteVisit = (id) => {
    setUniqueID(id);
    setOpenDelete(true);
  }

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              tableHeaders.map((item) => (
                <TableCell align="center" className="table-header">{item}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            allVisits.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align="center"
                  className="visits-column patient-field"
                >
                  {row.patient}
                </TableCell>
                <TableCell
                  align="center"
                  className="visits-column doctor-field"
                >
                  {row.doctor}
                </TableCell>
                <TableCell
                  align="center"
                  className="visits-column date-field"
                >
                  {row.date.substring(0, 10)}
                </TableCell>
                <TableCell
                  align="center"
                  className="visits-column"
                >
                  {row.problem}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className="buttons-field"
                >
                  <Container className="button-block">
                    <Edit
                      className="button-edit"
                      onClick={() => handleEditVisit(index)}
                    />
                    <Delete
                      className="button-delete"
                      onClick={() => handleDeleteVisit(row._id)}
                    />
                  </Container>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    {openEdit && <EditVisit
      className="modal-edit"
      editedVisit={editedVisit}
      openEdit={openEdit}
      setOpenEdit={setOpenEdit}
      setAllVisits={setAllVisits}
      doctors={doctors}
    />}
    {openDelete && <DeleteVisit
      className="modal-delete"
      unuqieID={unuqieID}
      openDelete={openDelete}
      setOpenDelete={setOpenDelete}
      setAllVisits={setAllVisits}
    />}
  </>
  )
}

export default ContentBlock;
