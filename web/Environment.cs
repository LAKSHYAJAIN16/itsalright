using System;

namespace Itsalright
{
    public class Program
    {
        //Set OS Version
        public static OperatingSystem OSVersion { get; set; }

        public static void Main(string[] args)
        {
            OSVersion = Environment.OSVersion;
        }
    }
}