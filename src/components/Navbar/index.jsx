import { useState } from 'react'

import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Container,
	Avatar,
	Button,
	Tooltip,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import { stringAvatar } from './helpers'

import Brand from './Brand'
import { Menu, CollapseMenu } from '../../components'
function Navbar() {
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)

	const optionsMainMenu = [{ label: 'Movies', to: '/movies' }]
	const optionsUserMenu = [{ label: 'Logout', to: '/logout' }]

	return (
		<AppBar position="static" color="primary">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Brand />

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<CollapseMenu
							anchor={anchorElNav}
							onClose={() => setAnchorElNav(null)}
							options={optionsMainMenu}
						/>
					</Box>

					<Menu
						options={optionsMainMenu}
						onClose={() => setAnchorElNav(null)}
					/>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar {...stringAvatar('John Doe')} />
							</IconButton>
						</Tooltip>
						<CollapseMenu
							anchor={anchorElUser}
							onClose={() => setAnchorElUser(null)}
							options={optionsUserMenu}
						/>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Navbar
