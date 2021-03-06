import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_ARTICLE_LIST } from '../../constants';
import { createArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import AuthorDropdown from '../../components/AuthorDropdown/AuthorDropdown';

function ArticleCreate() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [regions, setRegions] = useState([]);
    const [authorId, setAuthorId] = useState(0);

    const handleSave = async () => {
        const articleAuthor = authorId === 0 ? null : authorId;
        const payload = { title, content, regions, authorId: articleAuthor };
        await createArticle(payload);
        history.push(ROUTE_ARTICLE_LIST);
    };

    return (
        <div className="ArticleCreate">
            <h1>Create Article</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        data-testid="article-title"
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ (event) => setTitle(event.target.value) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        data-testid="article-content"
                        as="textarea"
                        placeholder="Content"
                        rows="5"
                        value={ content }
                        onChange={ (event) => setContent(event.target.value) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Regions</Form.Label>
                    <RegionDropdown
                        data-testid="article-regions"
                        value={ regions }
                        onChange={ (regions) => setRegions(regions) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <AuthorDropdown
                        data-testid="article-author"
                        value={ authorId }
                        onChange={ (author) => setAuthorId(author.id) }
                    />
                </Form.Group>
                <Button data-testid="article-save" variant="primary" onClick={ handleSave }>
                    Save Article
                </Button>
            </Form>
        </div>
    );
}

export default ArticleCreate;
