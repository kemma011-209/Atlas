import neo4j from "neo4j-driver";

const uri = "neo4j+s://0ba295f2.databases.neo4j.io";
const user = "neo4j";
const password = "MHMIawfVshXzx3sl4OnLFgc9BZ0p4tXI3AXijjGK6K0";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export const fetchGraphData = async (snapshotDate: string) => {
  const session = driver.session();
  try {
    console.log(`Fetching graph data for snapshot date: ${snapshotDate}`);

    const result = await session.run(
      `
      MATCH (a:Article)-[r:RELATED_TO]->(e:Event)
      WHERE a.created_date <= datetime($snapshotDate)
      RETURN a.id AS articleId, a.relevance AS articleRelevance, 
             e.id AS eventId, e.relevance AS eventRelevance, 
             r.strength AS strength
      `,
      { snapshotDate }
    );

    console.log("Raw result from Neo4j:", result);

    const nodes: Node[] = [];
    const links: Link[] = [];
    const nodeMap: Map<string, Node> = new Map();

    result.records.forEach((record) => {
      const articleId = record.get("articleId");
      const eventId = record.get("eventId");
      const articleRelevance = record.get("articleRelevance");
      const eventRelevance = record.get("eventRelevance");
      const strength = record.get("strength");

      console.log(
        `Processing record: articleId=${articleId}, eventId=${eventId}, strength=${strength}`
      );

      if (!nodeMap.has(articleId)) {
        nodeMap.set(articleId, {
          id: articleId,
          name: `Article ${articleId}`,
          value: articleRelevance,
        });
      }

      if (!nodeMap.has(eventId)) {
        nodeMap.set(eventId, {
          id: eventId,
          name: `Event ${eventId}`,
          value: eventRelevance,
        });
      }

      links.push({
        source: articleId,
        target: eventId,
        value: strength,
        animated: false,
      });
    });

    // Adding nodes
    nodeMap.forEach((node) => nodes.push(node));

    console.log("Final nodes:", nodes);
    console.log("Final links:", links);

    return { nodes, links };
  } finally {
    await session.close();
    console.log("Neo4j session closed");
  }
};
