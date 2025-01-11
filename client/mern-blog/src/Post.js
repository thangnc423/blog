import {format} from "date-fns";

export default function Post({title, summary, cover,content,createdAt}) {
    return (
        <div className="post">
          <div className="image">
            <img src="https://t.vndb.org/cv/03/79903.jpg" alt=""/>
          </div>
          <div className="texts">
            <h2>{title}</h2>
            <p className="info">
              <a href ="/"className="author">Yuzusoft</a>
              <time>{format(createdAt, 'MMM d, yyyy HH:mm')}</time>
            </p>
            <p className="summary">{summary}</p>
          </div>
        </div>
    );
}