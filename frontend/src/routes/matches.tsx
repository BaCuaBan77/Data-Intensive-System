import { createFileRoute } from '@tanstack/react-router'
import { Matches } from '../component/Matches'

export const Route = createFileRoute('/matches')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Matches />
}
