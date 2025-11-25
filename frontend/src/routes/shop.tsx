import { createFileRoute } from '@tanstack/react-router'
import { Shop } from '../component/Shop'

export const Route = createFileRoute('/shop')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Shop />
}
