// @flow

import React from 'react';
import PropTypes from "prop-types";
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client';
import hljs from 'highlight.js';
import PageError from "../PageError";

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        if (typeof document !== 'undefined') {
            const nodes = document.querySelectorAll('pre code');

            let i;
            for (i = 0; i < nodes.length; i++) {
                hljs.highlightBlock(nodes[i]);
            }
        }
    }

    render() {
        const { hasError, page } = this.props;

        if (hasError) {
            return <PageError error={page.error} />;
        }

        return (
            <div>
                {page.node &&
                <article>
                    <h1>{page.node.title}</h1>
                    <BodyRenderer>{page.node.body}</BodyRenderer>
                </article>}
            </div>
        );
    }
}

BlogPost.propTypes = {
    hasError: PropTypes.bool,
    page: PropTypes.object
};

const BlogPostContainer = createContainer(BlogPost, props => ({
    page: query({ collection: 'posts', id: props.params.splat })
}));

export default BlogPostContainer;
