import { ChevronRight } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material"

export function HomeCard({ title, Icon, route, contentTitle, content }) {
  return (
    <Card sx={{ borderRadius: 4, minWidth: {xs: "85%", md: "25%"}, "& .MuiCardHeader-action": { marginTop: 0 } }}>
      <CardActionArea href={route}>
        <CardHeader sx={{ bgcolor: "primary.main" }} avatar={<Icon />} action={<ChevronRight />} title={title} titleTypographyProps={{ fontWeight: "500" }} />
      </CardActionArea>
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "600" }}>{contentTitle}</Typography>
        <Typography variant="body2" sx={{ textAlign: "center", fontWeight: "500" }}>{content}</Typography>
      </CardContent>
    </Card>
  )
}