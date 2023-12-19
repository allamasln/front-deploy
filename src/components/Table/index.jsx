import { useState } from 'react'

import {
	TableContainer,
	Table as TableMUI,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Stack,
	Button,
} from '@mui/material'

import { Dialog } from 'components'

function Table({ columns, rows, onEdit, onDelete }) {
	const [open, setOpen] = useState(false)
	const [rowToDelete, setRowToDelete] = useState({})

	const handleConfirm = (row) => {
		setRowToDelete(row)
		setOpen(true)
	}

	const handleClose = () => {
		setRowToDelete({})
		setOpen(false)
	}

	const handleDelete = () => {
		onDelete(rowToDelete)
		handleClose()
	}

	const handleEdit = (row) => {
		onEdit(row)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<TableMUI sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.label} {...column.props}>
									{column.label}
								</TableCell>
							))}
							{(onEdit || onDelete) && (
								<TableCell align="right">Acciones</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								{columns.map((column) => (
									<TableCell
										key={`${row._id} - ${column.label}`}
										{...column.props}
									>
										{row[column.path]}
									</TableCell>
								))}

								{(onEdit || onDelete) && (
									<TableCell align="right">
										<Stack direction="row" justifyContent="end" spacing={2}>
											{onEdit && (
												<Button
													variant="contained"
													onClick={() => handleEdit(row)}
												>
													Editar
												</Button>
											)}

											{onDelete && (
												<Button
													variant="contained"
													color="error"
													onClick={() => {
														handleConfirm(row)
													}}
												>
													Borrar
												</Button>
											)}
										</Stack>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</TableMUI>
			</TableContainer>
			<Dialog
				open={open}
				onClose={handleClose}
				onDelete={handleDelete}
				confirmText="¿Seguro que quiere borrar el cliente?"
			/>
		</>
	)
}
export default Table
