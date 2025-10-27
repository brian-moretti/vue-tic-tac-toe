import type { Players } from '../enums/player.enums'
import type { Roles } from '../enums/role.enums'

export interface IPlayer {
  id: number
  role: Roles
  title: Players
}
