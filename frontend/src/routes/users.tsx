import { createFileRoute } from '@tanstack/react-router'
import { Users } from '../component/Users'

export const Route = createFileRoute('/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Users />
}
