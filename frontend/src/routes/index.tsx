import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../component/Dashboard'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}
