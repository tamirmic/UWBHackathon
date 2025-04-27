import { Card, CardContent, CardGrid} from './Card';


export function Reviews({ reviews }) {
    console.log(reviews)

    const lines = reviews.split('\n');
  
    const cards = [];
    let currentCard = null;
  
    lines.forEach((line, index) => {
      line = line.trim();
      if (line.startsWith('**')) {
        // New card
        if (currentCard) {
          cards.push(currentCard);
        }
        currentCard = {
          title: line.replace(/\*\*/g, ''),
          content: [],
        };
      } else if (line === '') {
        // Optionally, add a <br /> or ignore
        currentCard?.content.push(<br key={`br-${index}`} />);
      } else if (line.startsWith('*Issue:*')) {
        currentCard?.content.push(<p key={`p-${index}`}>{line.replace(/\*/g, '')}</p>);
      } else if (line.startsWith('*Actionable Items:*')) {
        currentCard?.content.push(<p key={`p-${index}`}>{line.replace(/\*/g, '')}</p>);

      } else if (line.startsWith('*')) {
        currentCard?.content.push(<li key={`li-${index}`}>{line.replace(/\*/g, '')}</li>);
      } else {
        currentCard?.content.push(<p key={`p-${index}`}>{line}</p>);
      }
    });
  
    if (currentCard) {
      cards.push(currentCard);
    }
  
    return (
      <CardGrid>
        {cards.map((card, index) => (
          <Card key={index} className="w-80">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">{card.title}</h3>
              <div className="space-y-2">
                {card.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardGrid>

    );
  }

