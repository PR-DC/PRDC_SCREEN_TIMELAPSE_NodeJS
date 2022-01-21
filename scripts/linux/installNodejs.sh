#!/bin/sh
# installNodejs.sh
# Batch file for installation of a certain version of node.js
# Author: Milos Petrasinovic <mpetrasinovic@pr-dc.com>
# PR-DC, Republic of Serbia
# info@pr-dc.com
# --- INPUTS ---
#  nodejsVersion - version of node.js
# --------------------
#
# Copyright (C) 2022 PR-DC <info@pr-dc.com>
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as 
# published by the Free Software Foundation, either version 3 of the 
# License, or (at your option) any later version.
#  
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#  
# You should have received a copy of the GNU Lesser General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
# --------------------

nodejsVersion="16.13.2"

# Execute commands
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
nvm install $nodejsVersion
# --------------------
