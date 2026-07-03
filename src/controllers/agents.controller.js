export const getAgents = (req, res) => {
    res.status(200).json({
      success: true,
      message: "List of agents",
      data: []
    });
  };
  
  export const getAgentById = (req, res) => {
    const { id } = req.params;
  
    res.status(200).json({
      success: true,
      message: `Agent ${id}`,
      data: {}
    });
  };