import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

type Props = {
    link: string
}

export default function Breadcrumb(props: Props) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">
                    HomePage
                </Link>
                <Link underline="hover" color="black" href={props.link === 'Shop' ? '/' : '/' + props.link}>
                    { props.link }
                </Link>
            </Breadcrumbs>
        </div>
    );
}
