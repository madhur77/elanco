import { useState } from 'react'
import * as React from 'react'
import type { GetServerSideProps } from 'next'
import ApplicationResponse from '../utils/responses/applicationresponses'
import Table from '../src/components/datatable'
export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(
        `https://engineering-task.elancoapps.com/api/resources`
    )
    const resources: string[] = await res.json()
    return { props: { resources } }
}

type Tresources = {
    resources: string[]
}

const Resources = ({ ...props }: Tresources): React.ReactElement => {
    const [data, setData] = useState<ApplicationResponse | null>(null)
    const [resourceName, setResourceName] = useState<string>()
    const selectApplication = async (name) => {
        const res = await fetch(
            'https://engineering-task.elancoapps.com/api/resources/' + name
        )
        const applicationData = await res.json()
        setResourceName(name)
        setData(applicationData)
    }
    return (
        <div>
            <p>
                <center>Click on the application to see stats</center>
            </p>
            <div style={{ display: 'inline-block' }}>
                <ul>
                    {props.resources.map((project) => (
                        <li
                            key={project}
                            onClick={() => selectApplication(project)}
                        >
                            {project}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ display: 'inline-block', width: '80%' }}>
                {data ? <Table data={data} title={resourceName} /> : <></>}
            </div>
        </div>
    )
}

export default Resources
