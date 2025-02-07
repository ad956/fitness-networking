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
  LuUserPlus,
} from "react-icons/lu";

const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    plan: "Premium",
    joinDate: "2024-03-01",
    status: "active",
    lastActive: "2024-03-10",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.c@example.com",
    plan: "Elite",
    joinDate: "2024-02-28",
    status: "active",
    lastActive: "2024-03-09",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    plan: "Basic",
    joinDate: "2024-02-27",
    status: "pending",
    lastActive: "2024-03-08",
  },
];

const GymMembers = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gym Members</h1>
        <Button color="primary" startContent={<LuUserPlus size={20} />}>
          Add New Member
        </Button>
      </div>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="LuSearch members..."
              startContent={<LuSearch size={18} />}
              className="max-w-xs"
            />
            <div className="flex gap-2">
              <Button variant="flat">All Members</Button>
              <Button variant="flat">Active</Button>
              <Button variant="flat">Pending</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table aria-label="Gym members table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>PLAN</TableColumn>
              <TableColumn>JOIN DATE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>LAST ACTIVE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Chip
                      color={member.status === "active" ? "success" : "warning"}
                      variant="flat"
                    >
                      {member.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{member.lastActive}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant="light">
                          <LuMoreVertical size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Member actions">
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

export default GymMembers;
