import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Button,
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  LuSearch,
  LuMoreVertical,
  LuFileEdit,
  LuTrash2,
  LuBuilding2,
  LuMapPin,
} from "react-icons/lu";

const owners = [
  {
    id: 1,
    name: "John Smith",
    email: "john.s@example.com",
    gymName: "FitZone Elite",
    location: "New York, NY",
    memberCount: 245,
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Lisa Wong",
    email: "lisa.w@example.com",
    gymName: "PowerFit Studio",
    location: "Los Angeles, CA",
    memberCount: 189,
    status: "active",
    joinDate: "2024-02-01",
  },
  {
    id: 3,
    name: "Robert Martinez",
    email: "robert.m@example.com",
    gymName: "CrossTrain Center",
    location: "Chicago, IL",
    memberCount: 156,
    status: "pending",
    joinDate: "2024-03-05",
  },
];

const GymOwners = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gym Owners</h1>
        <Button color="primary" startContent={<LuBuilding2 size={20} />}>
          Add New Gym
        </Button>
      </div>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="LuSearch gym owners..."
              startContent={<LuSearch size={18} />}
              className="max-w-xs"
            />
            <div className="flex gap-2">
              <Button variant="flat">All Owners</Button>
              <Button variant="flat">Active</Button>
              <Button variant="flat">Pending</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table aria-label="Gym owners table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>GYM NAME</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>MEMBERS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>JOIN DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{owner.name}</p>
                      <p className="text-small text-default-500">
                        {owner.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{owner.gymName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <LuMapPin size={16} />
                      {owner.location}
                    </div>
                  </TableCell>
                  <TableCell>{owner.memberCount}</TableCell>
                  <TableCell>
                    <Chip
                      color={owner.status === "active" ? "success" : "warning"}
                      variant="flat"
                    >
                      {owner.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{owner.joinDate}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant="light">
                          <LuMoreVertical size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Owner actions">
                        <DropdownItem startContent={<LuFileEdit size={18} />}>
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          className="text-danger"
                          color="danger"
                          startContent={<LuTrash2 size={18} />}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default GymOwners;
