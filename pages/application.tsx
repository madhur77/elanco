import { useState } from 'react'
import * as React from 'react'
import type { GetServerSideProps } from 'next'
import ApplicationResponse from '../utils/responses/applicationresponses'
import Table from '../src/components/datatable'
export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(
        `https://engineering-task.elancoapps.com/api/applications`
    )
    const applications: string[] = await res.json()
    return { props: { applications } }
}

type Tapplications = {
    applications: string[]
}

const Application = ({ ...props }: Tapplications): React.ReactElement => {
    const [data, setData] = useState<ApplicationResponse | null>(null)
    const [projectName, setProjectname] = useState<string>()
    const selectApplication = async (name) => {
        const res = await fetch(
            'https://engineering-task.elancoapps.com/api/applications/' + name
        )
        const applicationData: ApplicationResponse = await res.json()
        setProjectname(name)
        setData(applicationData)
    }

    return (
        <div>
            <p>
                <center>Click on the application to see stats</center>
            </p>
            <div style={{ display: 'inline-block' }}>
                <ul>
                    {props.applications.map((project) => (
                        <li
                            key={project}
                            onClick={() => selectApplication(project)}
                        >
                            {project}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ display: 'inline-block', width: '80%', top: 0 }}>
                {data ? <Table data={data} title={projectName} /> : <></>}
            </div>
        </div>
    )
}

export default Application
