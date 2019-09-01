using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using System.Web;
using WebApp.Models;
using WebApp.Persistence;

namespace WebApp.Hubs
{
    /**
     * Prilikom pristizanja svake poruke instancira se novi Hub koji
     * je obradjuje.
     * **/
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
        private ApplicationDbContext db = new ApplicationDbContext();
        private static Timer timer = new Timer();
        public static int counter = 0;
        public NotificationHub()
        {

        }

        public static List<Station> stations = new List<Station>();
        public static List<string> positions = new List<string>();/*(new string[] { "45.242252;19.835573", "45.242551;19.837060", "45.243137;19.839323" });*/

        public void GetTime()
        {
            if (counter > positions.Count - 1)
                counter = 0;
            if (positions.Count != 0)
            {
                Clients.All.setRealTime(positions[counter]);
                counter++;
            }

        }
        public void TimeServerUpdates()
        {
            if (!timer.Enabled)
            {
                timer.Interval = 2000;
                timer.Start();
                timer.Elapsed += OnTimedEvent;
            }
            
        }
        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            GetTime();
        }

        public void StopTimeServerUpdates()
        {
            timer.Stop();
        }

        public static void NotificationLine(Line line)
        {   if (stations.Count != 0)
            {
                stations.Clear();
            }
            if (positions.Count != 0)
            {
                positions.Clear();
            }
            stations = line.Stations;
            stations.ForEach(s => positions.Add($"{s.Latitude};{s.Longitude}"));
            counter = 0;
        }

        public void NotifyAdmins(int clickCount)
        {
            hubContext.Clients.Group("Admins").userClicked($"Clicks: {clickCount}");
        }

        public override Task OnConnected()
        {
            if (Context.User.IsInRole("Admin"))
            {
                Groups.Add(Context.ConnectionId, "Admins");
            }
           
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if (Context.User.IsInRole("Admin"))
            {
                Groups.Remove(Context.ConnectionId, "Admins");
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}