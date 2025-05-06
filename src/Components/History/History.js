import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBack, Event, CalendarToday } from "@mui/icons-material";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "https://periodcyclebackend.onrender.com/api/data"
        );
        setHistory(response.data.history);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to load history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton
            onClick={() => navigate("/cycle-tracker")}
            sx={{ mr: 2 }}
            // sx={{ color: "#ec407a" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 500, color: "#ad1457", fontSize: 30 }}
          >
            Period History
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress sx={{ color: "#ec407a" }} />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2, textAlign: "center" }}>
            {error}
          </Typography>
        ) : history.length > 0 ? (
          <List sx={{ width: "100%" }}>
            {history.map((period, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#ec407a" }}>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "#ad1457" }}
                      >
                        Cycle {index + 1}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <CalendarToday
                            fontSize="small"
                            sx={{ mr: 1, color: "text.secondary" }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                          >
                            {formatDate(period.date)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <Event
                            fontSize="small"
                            sx={{ mr: 1, color: "text.secondary" }}
                          />
                          <Typography
                            variant="body2"
                            color="text.primary"
                            component="span"
                          >
                            {period.details}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < history.length - 1 && <Divider variant="inset" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
            }}
          >
            <Event sx={{ fontSize: 60, color: "#f8bbd0", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#ad1457" }}>
              No period history available
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                borderColor: "#ec407a",
                color: "#ec407a",
                "&:hover": {
                  borderColor: "#ad1457",
                  backgroundColor: "#fce4ec",
                },
              }}
              onClick={() => navigate("/cycle-tracker")}
            >
              Track your first cycle
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default History;
